import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'stream/consumers';

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-11-20.acacia',
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    const event = Stripe.webhooks.constructEvent(
        buf,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'charge.succeeded') {
        const charge: any = event.data.object as Stripe.Charge;

        if (typeof charge.payment_intent === 'string') {
            await prisma?.order.update({
                where: { paymentIntentId: charge.payment_intent },
                data: { status: 'complete', address: charge.shipping?.address },
            });
        }
    }

    res.json({ received: true });
}

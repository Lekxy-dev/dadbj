import Stripe from 'stripe';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { CartProductType } from '@/app/Product/ProductDetails';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { error } from 'console';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-11-20.acacia",
});

const calculateOrderAmount = (items: CartProductType[]) => {
   return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export async function POST(request: Request) {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const body = await request.json();
      const { items, payment_intent_id } = body;

      if (!items || !Array.isArray(items)) {
         return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
      }

      const total = calculateOrderAmount(items) * 100; // Convert to smallest unit
      const orderData = {
         user: { connect: { id: currentUser.id } },
         amount: total,
         currency: 'NGN',
         status: 'pending',
         deliveryStatus: 'pending',
         paymentIntentId: payment_intent_id || null,
         products: items,
      };

      if (payment_intent_id) {
         // Update existing payment intent
         const current_Intent = await stripe.paymentIntents.retrieve(payment_intent_id)

         if(current_Intent){
            const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {amount: total})
            const [existing_order,update_order] = await Promise.all([prisma.order.findFirst({
               where: {paymentIntentId: payment_intent_id}
            }),
            prisma.order.update({
               where: {paymentIntentId: payment_intent_id},
               data: {
                   amount: total,
                   products: items
               }
            })        
           ])
           if(existing_order){
               return NextResponse.json(
                   {error: "Invalid Payment Intent"},
                   {status: 400}
               )
            
            } return NextResponse.json({ paymentIntent: updated_intent })
         }

       
      } else {
         // Create a new payment intent
         const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'NGN',
            automatic_payment_methods: { enabled: true },
         });

         orderData.paymentIntentId = paymentIntent.id;
         await prisma.order.create({ data: orderData });

         return NextResponse.json({ paymentIntent });
      }
    }

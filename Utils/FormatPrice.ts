export const formatprice = 
(amount: number) =>{
    return new Intl.NumberFormat
    (
        'en-Us', {
            style:'currency',
            currency:'NGN'
        }
    ).format(amount)
}
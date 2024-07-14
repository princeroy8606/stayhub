import { successPaymentRes } from "../api/api";
import { bookingPaymentSuccess } from "../redux/features/actions/guestActions";

export const PaymentLaunch = (order) => {
  console.log(order.notes.u_id)
  var options = {
    key: "rzp_test_BVclXIQdCra5rg",
    amount: "50000",
    currency: "INR",
    name: "Acme Corp",
    description: "Test Transaction",
    image: "http://localhost:5000/uploads/1707451510469_landing-page-img.jpg",
    order_id: order.id,
    handler: function (response){
      console.log("Payment successful:", response);
      // bookingPaymentSuccess
      successPaymentRes({data:order.notes.u_id,payment_intent:response.razorpay_payment_id})
      window.location.href = 'http://localhost:3000/payment-success'
    },
    notes: {
      address: "Razorpay Corporate Office",
      extradata: "devPrince@3000",
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp = new window.Razorpay(options);
  rzp.open();
};



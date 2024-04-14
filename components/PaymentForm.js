import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Store } from '../utils/Store';
import { motion } from 'framer-motion';

export const PaymentForm = () => {
	const { push } = useRouter();
	const paymentOptions = ['PayPal', 'Stripe', 'Cash On Delivery'];
	const [selectPaymentMethod, setSelectPaymentMethod] = useState('');
	const {
		state: { cart },
		dispatch,
	} = useContext(Store);
	const { shippingAddress, paymentMethod } = cart;

	const submitHandler = (e) => {
		e.preventDefault();

		if (!selectPaymentMethod) {
			return toast.error('Please select a payment method');
		}

		dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectPaymentMethod });

		push('/finish-order');
	};

	useEffect(() => {
		if (!shippingAddress.address) {
			return push('/shipping');
		}

		setSelectPaymentMethod(paymentMethod || '');
	}, [paymentMethod, shippingAddress.address]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="bg-stone-200 sm:px-16 py-10 my-16 mb-24 lg:mb-0 max-w-screen-lg flex flex-col items-center justify-center mx-auto"
		>
			<h1 className="my-5 text-xl sm:text-3xl text-emerald-900 uppercase tracking-wide text-center font-semibold">
				Choose a payment method
			</h1>
			<form
				onSubmit={submitHandler}
				className="mx-auto w-[300px] sm:w-[400px] space-y-4"
			>
				{paymentOptions.map((payment) => (
					<div key={payment} className="p-2 flex items-center">
						<input
							type="radio"
							name="paymentMethod"
							checked={selectPaymentMethod === payment}
							onChange={() => setSelectPaymentMethod(payment)}
							id={payment}
							className="outline-none focus:ring-0 w-5 h-5"
						/>
						<label htmlFor={payment} className="px-2">
							{payment}
						</label>
					</div>
				))}

				<div className="flex justify-between">
					<button
						type="button"
						onClick={() => push('/shipping')}
						className="default-button  p-3 px-5 mt-5"
					>
						Back
					</button>
					<button className="newprimarybtn  p-3 px-5 mt-5">Next</button>
				</div>
			</form>
		</motion.div>
	);
};

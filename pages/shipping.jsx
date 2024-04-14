import { AddressForm } from '../components/AddressForm';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';

export default function Shipping() {
	return (
		<>
			<Layout title={'Shipping'}>
				<div className="my-14">
					<CheckoutWizard activeStep={1} />
					<AddressForm />
				</div>
			</Layout>
		</>
	);
}

Shipping.auth = true;

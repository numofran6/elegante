/**
 * External dependencies
 */
import Link from 'next/link';
import { useContext } from 'react';
import Image from 'next/image';

/**
 * Internal dependencies
 */
import { Layout } from '../components';
import { Order } from '../utils';

function OrderHistory() {
	const {
		state: { order },
	} = useContext(Order);

	return (
		<Layout title={'ORDER HISTORY'}>
			<h2 className="auth-title mb-10">Order History</h2>

			{order ? (
				<div className="overflow-x-auto mb-14">
					<table className="min-w-full border-[#bbb] border text-sm md:text-md">
						<thead>
							<tr className=" text-left border-[#bbb] border-b">
								<th className="px-5">ITEM</th>
								<th className="p-5">ORDER DATE</th>
								<th className="p-5">PAID</th>
								<th className="p-5">DELIVERED</th>
								<th className="p-5"></th>
							</tr>
						</thead>

						<tbody>
							{order.orderItems?.map((item, i) => (
								<tr
									className={`${
										i < order.orderItems.length - 1
											? 'border-[#888] border-b'
											: ''
									}`}
									key={item._id}
								>
									<td className="p-5 flex flex-col md:flex-row items-center gap-5 text-left">
										<Image
											src={item.image}
											alt={item.name}
											width={80}
											height={80}
										/>
										{item.name}
									</td>
									<td className="p-5">{order.createdAt.substring(0, 10)} </td>
									<td className="p-5">
										{order.isPaid ? (
											`${order.paidAt.substring(0, 10)}`
										) : (
											<p className="">NOT PAID</p>
										)}
									</td>
									<td className="p-5">
										{order.isDelivered ? (
											`${order.deliveredAt.substring(0, 10)}`
										) : (
											<p className="">NOT DELIVERED</p>
										)}
									</td>
									<td className="p-5">
										<Link href={`/order/${order._id}`} className="link-blue">
											Go to order
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className="text-center">
					<h1>Please go shopping first to be able to view shopping history</h1>
					<Link
						href={'/shop'}
						className="text-green-500 text-sm hover:text-green-300 active:text-green-500"
					>
						Go Shopping
					</Link>
				</div>
			)}
		</Layout>
	);
}

OrderHistory.auth = true;
export default OrderHistory;

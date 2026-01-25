import Link from 'next/link';

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Refund Policy
                </h1>

                <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 mb-4">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                        Refund Requests
                    </h2>
                    <p className="text-gray-700 mb-4">
                        If you are not satisfied with your purchase, you may request a refund within 30 days
                        of your original purchase date.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                        How to Request a Refund
                    </h2>
                    <p className="text-gray-700 mb-4">
                        To request a refund, please contact us at:
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
                        <p className="font-medium text-gray-900">Email: support@birdobot.site</p>
                    </div>
                    <p className="text-gray-700 mb-4">
                        Please include the following information in your refund request:
                    </p>
                    <ul className="list-disc pl-6 mb-4 text-gray-700">
                        <li>Your order number or transaction ID</li>
                        <li>The email address used for purchase</li>
                        <li>Reason for the refund request</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                        Processing Time
                    </h2>
                    <p className="text-gray-700 mb-4">
                        We will review your request and respond within 2-3 business days. If approved,
                        refunds will be processed within 5-10 business days and credited to your original
                        payment method.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                        Contact Us
                    </h2>
                    <p className="text-gray-700">
                        If you have any questions about our refund policy, please contact us at
                        support@birdobot.site
                    </p>
                </div>
            </div>
        </div>
    );
}
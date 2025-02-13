import React, { useState } from "react";

const FeeStructure = () => {
  // Dummy fee structure data
  const feeData = [
    {
      srNo: 1,
      particular: "Educational Fee",
      amount: "12,000 INR",
    },
    {
      srNo: 2,
      particular: "One-Time Admission Fee",
      amount: "12,000 INR",
    },
    {
      srNo: 3,
      particular: "Security Deposit",
      amount: "12,000 INR",
    },
    {
      srNo: 4,
      particular: "Other Fee",
      amount: "12,000 INR",
    },
    {
      srNo: 5,
      particular: "Development Fee",
      amount: "12,000 INR",
    },
    {
      srNo: 6,
      particular: "Course Admission Fee",
      amount: "12,000 INR",
    },
    {
      srNo: 7,
      particular: "Hostel Fee",
      messCharges: "12,000 INR",
      electricityWater: "12,000 INR",
      roomRent: "12,000 INR",
      campusFee: "12,000 INR",
    },
  ];

  const [showDetails, setShowDetails] = useState(false);

  const paymentDetails = {
    firstInstallment: "30,000 INR",
    secondInstallment: "20,000 INR",
    totalAmount: "50,000 INR",
    alreadyPaid: "20,000 INR",
    lastPaymentDate: "2025-01-01",
    amountLeft: "30,000 INR",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {!showDetails && (
          <>
            {/* Header */}
            <div className="flex items-center mb-6">
              <h1 className="text-3xl font-bold text-white bg-blue-700 px-4 py-2 rounded-lg shadow-md">
                Fee Structure
              </h1>
            </div>
            <div className="border-b-4 border-blue-500 w-20 mb-6"></div>

            {/* Fee Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="text-left px-6 py-3 text-blue-900 font-semibold">Sr No</th>
                    <th className="text-left px-6 py-3 text-blue-900 font-semibold">Particular</th>
                    <th className="text-left px-6 py-3 text-blue-900 font-semibold">Amount</th>
                    <th className="text-left px-6 py-3 text-blue-900 font-semibold">Mess Charges</th>
                    <th className="text-left px-6 py-3 text-blue-900 font-semibold">Electricity and Water</th>
                    <th className="text-left px-6 py-3 text-blue-900 font-semibold">Room Rent</th>
                    <th className="text-left px-6 py-3 text-blue-900 font-semibold">Campus Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {feeData.map((fee, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                      } text-gray-800`}
                    >
                      <td className="px-6 py-3">{fee.srNo}</td>
                      <td className="px-6 py-3">{fee.particular}</td>
                      <td className="px-6 py-3">{fee.amount || ""}</td>
                      <td className="px-6 py-3">{fee.messCharges || ""}</td>
                      <td className="px-6 py-3">{fee.electricityWater || ""}</td>
                      <td className="px-6 py-3">{fee.roomRent || ""}</td>
                      <td className="px-6 py-3">{fee.campusFee || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setShowDetails(true)}
            >
              View Your Details
            </button>
          </>
        )}

        {/* Details Section */}
        {showDetails && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mx-auto w-3/4">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Payment Details</h2>
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">First Installment:</td>
                  <td className="px-4 py-2">{paymentDetails.firstInstallment}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Second Installment:</td>
                  <td className="px-4 py-2">{paymentDetails.secondInstallment}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Total Amount:</td>
                  <td className="px-4 py-2">{paymentDetails.totalAmount}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Already Paid:</td>
                  <td className="px-4 py-2">{paymentDetails.alreadyPaid}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Last Payment Date:</td>
                  <td className="px-4 py-2">{paymentDetails.lastPaymentDate}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Amount Left to Pay:</td>
                  <td className="px-4 py-2">{paymentDetails.amountLeft}</td>
                </tr>
              </tbody>
            </table>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setShowDetails(false)}
            >
              Back to Fee Structure
            </button>
          </div>
        )}

        {/* Footer Section */}
        <div className="mt-8 text-gray-600 text-sm">
          <p>Please contact the administration for any fee-related queries or updates.</p>
        </div>
      </div>
    </div>
  );
};

export default FeeStructure;

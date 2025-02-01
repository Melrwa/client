"use client";
import { useEffect, useState } from "react";

export default function TransactionsList() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/transactions")
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setTransactions(data);
                }
            })
            .catch((err) => console.error("Error fetching transactions:", err));
    }, []);

      // Calculate total amount paid
      const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount_paid, 0);
    

      return (
          <div className="bg-[#800020] min-h-screen p-6 text-white flex flex-col items-center">
             <h2 className="text-3xl font-bold mb-6 self-start">All Transactions</h2>

              {error && <p className="text-red-500">{error}</p>}
  
              <div className="w-full overflow-x-auto">
                  <table className="w-full max-w-5xl border border-gray-600 bg-red-900 shadow-lg text-center">
                      <thead className="bg-[#800020] text-white">
                          <tr className="text-lg">
                              <th className="p-4 border border-gray-600">Service</th>
                              <th className="p-4 border border-gray-600">Staff</th>
                              <th className="p-4 border border-gray-600">Client</th>
                              <th className="p-4 border border-gray-600">Amount Paid</th>
                              <th className="p-4 border border-gray-600">Time Taken</th>
                              <th className="p-4 border border-gray-600">Booking Time</th>
                          </tr>
                      </thead>
                      <tbody>
                          {transactions.length > 0 ? (
                              transactions.map((transaction, index) => (
                                  <tr
                                      key={transaction.id}
                                      className={`border border-gray-600 ${
                                          index % 2 === 0 ? "bg-[#900020]" : "bg-red-800"
                                      } text-white text-lg`}
                                  >
                                      <td className="p-4">{transaction.service_name}</td>
                                      <td className="p-4">{transaction.staff_name}</td>
                                      <td className="p-4">{transaction.client_name || "N/A"}</td>
                                      <td className="p-4">${transaction.amount_paid.toFixed(2)}</td>
                                      <td className="p-4">{transaction.time_taken} hrs</td>
                                      <td className="p-4 text-sm text-gray-300">
                                          {new Date(transaction.booking_time).toLocaleString()}
                                      </td>
                                  </tr>
                              ))
                          ) : (
                              <tr>
                                  <td colSpan="6" className="p-6 text-gray-300">
                                      No transactions found.
                                  </td>
                              </tr>
                          )}
                      </tbody>
                      {/* TOTAL AMOUNT ROW */}
                      <tfoot>
                          <tr className="bg-[#800020] text-white font-bold text-lg">
                              <td colSpan="3" className="p-4 border border-gray-600 text-right">
                                  Total Revenue:
                              </td>
                              <td className="p-4 border border-gray-600">${totalAmount.toFixed(2)}</td>
                              <td colSpan="2" className="border border-gray-600"></td>
                          </tr>
                      </tfoot>
                  </table>
              </div>
          </div>
      );
  }
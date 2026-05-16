import { useState } from 'react';

const Form = () => {
  const [contractID, setContractID] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [alert, setAlert] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (contractID === '') newErrors.contractID = 'Contract ID is required';
    if (paymentDate === '') newErrors.paymentDate = 'Payment Date is required';
    if (amountPaid === '') newErrors.amountPaid = 'Amount Paid is required';
    if (paymentStatus === '') newErrors.paymentStatus = 'Payment Status is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const response = await fetch('http://localhost:5254/api/Sponsor/Add-Payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contractID: parseInt(contractID),
          paymentDate,
          amountPaid: parseInt(amountPaid),
          paymentStatus
        })
      });
      const data = await response.text();
      setAlert(data);
    }
  }

  return (
    <div style={{ width: '50%', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>Form</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ marginBottom: '10px' }}>
          Contract ID:
          <input type="number" value={contractID} onChange={e => setContractID(e.target.value)} style={{ width: '100%', height: '30px', padding: '10px', margin: '10px 0', border: '1px solid #ccc' }} />
          {errors.contractID && <div style={{ color: 'red' }}>{errors.contractID}</div>}
        </label>
        <label style={{ marginBottom: '10px' }}>
          Payment Date:
          <input type="datetime-local" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} style={{ width: '100%', height: '30px', padding: '10px', margin: '10px 0', border: '1px solid #ccc' }} />
          {errors.paymentDate && <div style={{ color: 'red' }}>{errors.paymentDate}</div>}
        </label>
        <label style={{ marginBottom: '10px' }}>
          Amount Paid:
          <input type="number" value={amountPaid} onChange={e => setAmountPaid(e.target.value)} style={{ width: '100%', height: '30px', padding: '10px', margin: '10px 0', border: '1px solid #ccc' }} />
          {errors.amountPaid && <div style={{ color: 'red' }}>{errors.amountPaid}</div>}
        </label>
        <label style={{ marginBottom: '10px' }}>
          Payment Status:
          <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)} style={{ width: '100%', height: '30px', padding: '10px', margin: '10px 0', border: '1px solid #ccc' }}>
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          {errors.paymentStatus && <div style={{ color: 'red' }}>{errors.paymentStatus}</div>}
        </label>
        <button type="submit" style={{ width: '100%', height: '30px', padding: '10px', margin: '10px 0', border: 'none', borderRadius: '5px', backgroundColor: '#4CAF50', color: '#fff', cursor: 'pointer' }}>Submit</button>
      </form>
      {alert !== '' && <div style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>{alert}</div>}
    </div>
  )
}

export default Form;
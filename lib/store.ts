export const globalStore = {
  upiId: 'thecapitalguru@upi',
  qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=thecapitalguru@upi&pn=TheCapitalGuru',
  maintenance: false,
  whatsappNumber: '919876543210',
  pendingPayments: [
    { id: 1, name: 'Rahul K.', plan: 'Monthly', status: 'Pending Verification', date: '2023-10-24' },
    { id: 2, name: 'Amit S.', plan: 'Lifetime', status: 'Pending Verification', date: '2023-10-25' }
  ]
};

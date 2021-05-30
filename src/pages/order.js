import React from 'react';
import SEO from '../components/SEO';

export default function OrderPage() {
  const [name, setName] = useState('');
  return (
    <>
      <SEO title="Order a Pizza!" />
    </>
  );
}

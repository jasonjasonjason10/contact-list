import { useEffect, useState } from "react";
import "./SelectedContact.css";


export default function SelectedContact({ selectedContactId, setSelectedContactId }) {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setContact(result);
      } catch (error) {
        console.error("Error fetching selected contact:", error);
      } finally {
        setLoading(false);
      }
    }

    if (selectedContactId) {
      fetchContact();
    }
  }, [selectedContactId]);

  if (loading) return <p>Loading contact details...</p>;
  if (!contact) return <p>Error: Contact not found</p>;

  return (
    <div className="selected-contact-container">
      <h2>{contact.name}</h2>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Address: {contact.address?.street}</p>
      <p>Address: {contact.address?.suite}</p>
      <p>Address: {contact.address?.city}</p>
      <button className="back-button" onClick={() => setSelectedContactId(null)}>
        Back to Contact List
      </button>
    </div>
  );
}

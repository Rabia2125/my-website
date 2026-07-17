 // Add this at the top of your page.js
"use client"; 

export default function Home() {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form se data nikal rahe hain
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
      // Subject aur phone optional hain, agar form mein hain toh add karein
    };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if ((await res.json()).success) {
      alert("Message successfully sent to database!");
      e.target.reset(); // Form clear karne ke liye
    } else {
      alert("Error sending message.");
    }
  };

  return (
    <main className="bg-gray-950 text-white min-h-screen">
      {/* ... baqi code waisa hi rahega ... */}

      {/* Contact Section Update */}
      <section id="contact" className="py-20 px-10">
        <h2 className="text-3xl font-bold mb-10 text-center text-blue-500">Contact Me</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-4">
          <input name="name" type="text" placeholder="Full Name" className="p-3 bg-gray-900 border border-gray-800 rounded" required />
          <input name="email" type="email" placeholder="Email Address" className="p-3 bg-gray-900 border border-gray-800 rounded" required />
          <textarea name="message" placeholder="Your Message" className="p-3 bg-gray-900 border border-gray-800 rounded h-32" required></textarea>
          <button type="submit" className="bg-blue-600 py-3 rounded font-bold hover:bg-blue-700 transition">Send Message</button>
        </form>
      </section>

      {/* ... footer ... */}
    </main>
  );
}

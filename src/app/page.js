"use client";

export default function Home() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (result.success) {
      alert("Message successfully sent!");
      e.target.reset();
    } else {
      alert("Error sending message.");
    }
  };

  return (
    <main className="bg-gray-950 text-white min-h-screen scroll-smooth">
      
      {/* Navbar */}
      <nav className="sticky top-0 bg-gray-950/80 backdrop-blur-md flex justify-between items-center p-6 border-b border-gray-800 z-50">
        <h1 className="text-2xl font-bold text-blue-500">RK.</h1>
        <ul className="flex gap-6 text-sm font-medium">
          <li><a href="#home" className="hover:text-blue-400">Home</a></li>
          <li><a href="#about" className="hover:text-blue-400">About</a></li>
          <li><a href="#skills" className="hover:text-blue-400">Skills</a></li>
          <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 text-center">
        <h2 className="text-blue-500 font-semibold mb-2">Hello, I'm</h2>
        <h1 className="text-6xl font-bold mb-4">Rabia Khalid</h1>
        <h3 className="text-2xl text-gray-400 mb-8">Software Engineering Student</h3>
        <div className="flex justify-center gap-4">
          <a href="#projects" className="bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-700 transition">View Projects</a>
          <a href="#contact" className="border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 transition">Contact Me</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-10 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-blue-500">About Me</h2>
          <p className="text-gray-300 mb-4">I am a passionate Software Engineering student dedicated to building modern web applications. My career objective is to leverage my skills in MERN stack, AI, and Digital Marketing to create impactful digital solutions.</p>
          <p className="text-gray-300">Driven by a love for clean code and user-centric design, I am constantly learning and exploring new technologies to grow as a developer.</p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-10">
        <h2 className="text-3xl font-bold mb-10 text-center text-blue-500">Technical Skills</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Node.js', 'MongoDB', 'Python'].map((skill) => (
            <div key={skill} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500 transition">{skill}</div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-10 bg-gray-900">
        <h2 className="text-3xl font-bold mb-10 text-center text-blue-500">Projects</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {['Portfolio Website', 'DSA Mentor Chatbot', 'E-Commerce Site'].map((proj) => (
            <div key={proj} className="p-6 bg-gray-950 border border-gray-800 rounded-2xl">
              <div className="h-40 bg-gray-800 mb-4 rounded-lg"></div>
              <h3 className="font-bold text-xl mb-2">{proj}</h3>
              <p className="text-gray-400 text-sm mb-4">Short description of this amazing project goes here.</p>
              <button className="text-blue-500 font-semibold text-sm hover:underline">View on GitHub</button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-10">
        <h2 className="text-3xl font-bold mb-10 text-center text-blue-500">Contact Me</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-4">
          <input name="name" type="text" placeholder="Full Name" className="p-3 bg-gray-900 border border-gray-800 rounded" required />
          <input name="email" type="email" placeholder="Email Address" className="p-3 bg-gray-900 border border-gray-800 rounded" required />
          <textarea name="message" placeholder="Your Message" className="p-3 bg-gray-900 border border-gray-800 rounded h-32" required></textarea>
          <button type="submit" className="bg-blue-600 py-3 rounded font-bold hover:bg-blue-700 transition">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 border-t border-gray-900">
        <p>&copy; 2026 Rabia Khalid. All rights reserved.</p>
      </footer>

    </main>
  );
}
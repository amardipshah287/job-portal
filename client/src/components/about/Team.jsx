import Jane from "../../assets/success1.png";
import John from "../../assets/success2.png";
import Emily from "../../assets/success3.png";

export function Team() {
  return (
    <section className="bg-white text-primary py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            {
              name: "Jane Doe",
              role: "CEO & Founder",
              image: Jane,
            },
            {
              name: "John Smith",
              role: "CTO",
              image: John,
            },
            {
              name: "Emily Brown",
              role: "Head of Customer Success",
              image: Emily,
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-52 h-52 rounded-full mx-auto"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

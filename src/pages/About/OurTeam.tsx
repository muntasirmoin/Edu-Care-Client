const OurTeam = () => {
  return (
    <>
      <section
        id="team"
        className="px-4 py-2 md:px-4 mx-auto bg-violet-50 dark:bg-violet-900 transition-colors"
      >
        {/* Team Section */}
        <div className="mb-8  text-left">
          <h3 className="text-3xl font-bold mb-4 text-center text-violet-700 dark:text-white">
            Meet Our Team
          </h3>
          <p className="text-violet-700 text-left dark:text-white mb-12 ml-3.5 mx-auto">
            Our team combines dedication, creativity, and expertise to provide
            seamless course enrollment experiences. Each member is passionate
            about education and committed to making learning accessible,
            efficient, and enjoyable for every student. We focus on innovation,
            collaboration, and delivering high-quality digital solutions that
            simplify the enrollment process and empower both students and
            educators. Together, we ensure that every learner has the support
            and resources they need to succeed academically and achieve their
            goals with confidence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Muntasir",
                role: "Founder",
                img: `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757314936/68621_1_1-Photoroom_optimized_950-Photoroom_cob5xy.png`,
              },
              {
                name: "Fatema",
                role: "CEO",
                img: `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757314826/femaleAvarter_a9tqgy.png`,
              },
              {
                name: "Rahim",
                role: "Product Designer",
                img: `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757314827/maleAvarter_qus9ex.png`,
              },
            ].map((member, i) => (
              <div
                key={i}
                className="text-center hover:scale-105 transform transition-transform duration-300"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-gray-300 dark:border-gray-700"
                />
                <h4 className="font-semibold text-violet-700 dark:text-white">
                  {member.name}
                </h4>
                <p className="text-sm text-violet-700 dark:text-white">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurTeam;

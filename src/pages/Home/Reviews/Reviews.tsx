"use client";

import TitleSubTitle from "@/components/layout/Shared/TitleSubTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import the dummy reviews

export default function Reviews() {
  const studentReviews = [
    {
      name: "Fatema Rahman",
      course: "World History",
      rating: 5,
      review:
        "EduCare made enrolling in courses so easy! The platform is intuitive and helped me focus on learning without any hassle.",
      avatar: `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757314826/femaleAvarter_a9tqgy.png`,
    },
    {
      name: "Muntasir Chowdhury",
      course: "Computer Science Basics",
      rating: 4.5,
      review:
        "I love the seamless course enrollment experience. Everything from browsing to registration is super smooth!",
      avatar: `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757314936/68621_1_1-Photoroom_optimized_950-Photoroom_cob5xy.png`,
    },
    {
      name: "Rahim Ahmed",
      course: "Graphic Design Essentials",
      rating: 5,
      review:
        "The platform is well-designed and very easy to use. I feel supported every step of the way. Highly recommend EduCare!",
      avatar: `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757314827/maleAvarter_qus9ex.png`,
    },
    {
      name: "Ayesha Siddiqua",
      course: "Business Management",
      rating: 4,
      review:
        "A great experience! The enrollment process was quick and efficient. I can now focus entirely on my studies.",
      avatar: `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757314826/femaleAvarter_a9tqgy.png`,
    },
    {
      name: "Kamal Hossain",
      course: "Digital Marketing",
      rating: 5,
      review:
        "EduCare provides a professional and user-friendly experience. It made enrolling in courses easy and stress-free.",
      avatar: `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757314827/maleAvarter_qus9ex.png`,
    },
    {
      name: "Amina Khatun",
      course: "Design",
      rating: 4,
      review:
        "A great experience! The enrollment process was quick and efficient. I can now focus entirely on my studies.",
      avatar: `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757314826/femaleAvarter_a9tqgy.png`,
    },
  ];

  return (
    <section
      id="reviews"
      className="px-10 py-4 md:px-10  mx-auto bg-violet-50 dark:bg-violet-900 transition-colors"
    >
      {/* Section Header */}

      <TitleSubTitle
        title="  What Our Students Say"
        subtitle="Hear from our learners about their experiences with EduCare!"
      />

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {studentReviews.map((review, index) => (
          <Card
            key={index}
            className="bg-white dark:bg-violet-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="flex items-center justify-between">
              {/* Name and Course on the right */}
              <div className="flex flex-col items-start">
                <CardTitle className="text-violet-700 dark:text-white text-lg font-semibold">
                  {review.name}
                </CardTitle>
                <p className="text-sm text-violet-700 dark:text-white/80">
                  {review.course}
                </p>
              </div>
              {/* Avatar on the left */}
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              />
            </CardHeader>

            <CardContent>
              <p className="text-violet-700 text-left dark:text-white/80">
                {review.review}
              </p>
              <div className="mt-4  flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className="text-yellow-400">
                    {i < Math.floor(review.rating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

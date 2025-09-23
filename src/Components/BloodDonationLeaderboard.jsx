import { useEffect, useState } from "react";

// Department data with fallback scores and additional info.
const departmentData = [
  {
    id: "aids",
    name: "AIDS",
    score: 0,
    image: "./assets/Mercury-removebg-preview.png",
    rocket: "./assets/rocket.png",
    color: "linear-gradient(270deg, #F3AD5C 70%, #F6F1AE 100%)"
  },
  {
    id: "aiml",
    name: "AIML",
    score: 0,
    image: "./assets/Venus-removebg-preview.png",
    rocket: "./assets/rocket.png",
    color: "linear-gradient(270deg, #78470F 70%, #EEDACC 100%)"

  },
  {
    id: "it",
    name: "IT",
    score: 0,
    image: "./assets/Earth-removebg-preview.png",
    rocket: "./assets/rocket.png",
    color: "linear-gradient(270deg, #4AABDF 70%, #CEF2FF 100%)"
  },
  {
    id: "comps",
    name: "COMPS",
    score: 0,
    image: "./assets/Mars-removebg-preview.png",
    rocket: "./assets/rocket.png",
    color: "linear-gradient(270deg, #FB1F07 70%, #FFE2DD 100%)"
  },
  {
    id: "extc",
    name: "EXTC",
    score: 0,
    image: "./assets/Jupiter-removebg-preview.png",
    rocket: "./assets/rocket.png",
    color: "linear-gradient(270deg, #6C5330 70%, #F8C462 100%)"
  },
  {
    id: "mech",
    name: "MECH",
    score: 0,
    image: "./assets/Saturn-removebg-preview.png",
    rocket: "./assets/rocket.png",
    color: "linear-gradient(270deg, #010101 0%, #F5A511 100%)"
  },
  {
    id: "cseds",
    name: "CSEDS",
    score: 90,
    image: "./assets/Uranus-removebg-preview.png",
    rocket: "./assets/rocket.png",
    color: "linear-gradient(270deg, #0675E4 70%, #CAEDF9 100%)"
  },
  {
    id: "icb",
    name: "ICB",
    score: 0,
    image: "./assets/Neptune-removebg-preview.png",
    rocket: "./assets/rocket.png",
    color: "linear-gradient(270deg, #0239FF 70%, #C5CAFA 100%)"
  },
  {
    id: "outsiders",
    name: "Outsiders",
    score: 0,
    image: "./assets/Sun.png",
    rocket: "./assets/rocket.png",
    color: "linear-gradient(90deg, #fdfd08ff 0%, #ea951dff 88.94%)"
  },
];

export function BloodDonationLeaderboard() {
  const [animatedScores, setAnimatedScores] = useState(
    departmentData.map(() => 0)
  );
  const [targetScores, setTargetScores] = useState(departmentData.map(() => 0));

  // Simulate API fetch
  useEffect(() => {
    setTargetScores([95, 88, 95, 88, 92, 80, 90, 92,85]);
  }, []);

  // Animate scores
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedScores((prev) => {
        const newScores = [...prev];
        let completed = true;
        for (let i = 0; i < departmentData.length; i++) {
          if (newScores[i] < targetScores[i]) {
            newScores[i] += 1;
            completed = false;
          } else if (newScores[i] > targetScores[i]) {
            newScores[i] -= 1;
            completed = false;
          }
        }
        if (completed) clearInterval(interval);
        return newScores;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [targetScores]);

  const highestScore = Math.max(...targetScores)+10;
  const barMax = highestScore + 10;

  return (
    <div
      className="w-full rounded-3xl p-6 shadow-xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(245,245,245,0.9), rgba(230,230,230,0.9))", // soft white-grey gradient
      }}
    >
      {/* Title */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <img
          src="/peacock.svg"
          alt="Decorative peacock"
          width={90}
          height={90}
        />
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
            BLOOD DONATION 🩸
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 tracking-wide mt-1 italic">
            LEADERBOARD
          </h2>
        </div>
        <img
          src="/peacock.svg"
          alt="Decorative peacock"
          width={90}
          height={90}
          style={{ transform: "scaleX(-1)" }}
        />
      </div>

      {/* Leaderboard bars */}
      <div className="space-y-6">
        {departmentData.map((dept, index) => {
          const widthPercentage =
            barMax > 0
              ? Math.min((animatedScores[index] / barMax) * 100, 100)
              : 0;

          return (
            <div key={dept.id} className="flex items-center gap-4">
              {/* Department name */}
              <div className="w-24 text-center">
                <span className="font-bold text-xl text-red-700 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                  {dept.name}
                </span>
              </div>

              {/* Progress bar container */}
              <div
                className="relative flex-1 h-12 rounded-full shadow-inner overflow-visible"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(245,245,245,0.8), rgba(230,230,230,0.8))",
                }}
              >
                <div className="overflow-hidden h-full rounded-full">
                  <div
                    className="h-full transition-all duration-300 ease-out"
                    style={{
                      width: `${widthPercentage}%`,
                      background: dept.color, // red to yellow gradient trail
                      borderRadius: "9999px", // keep rounded ends
                    }}
                  />
                </div>

                {/* rocket image */}
                <div
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 w-20 h-20"
                  style={{ left: `calc(${widthPercentage}% - 40px)` }}
                >
                  <img
                    src={dept.rocket || "/placeholder.svg"}
                    alt={`${dept.name} rocket`}
                    className="object-cover w-20 h-20 rounded-full"
                    style={{
                      //   filter: 'drop-shadow(3px 3px 5px rgba(0,0,0,0.4))',
                      transition: "transform 0.3s",
                      scale: "0.85",
                    }}
                  />
                </div>
              </div>

              {/* Planet image + Score */}
              <div className="flex items-center gap-2 w-24 justify-center">
                <img
                  src={dept.image}
                  alt={`${dept.name} planet`}
                  className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
                  style={{
                    filter: "drop-shadow(2px 2px 5px rgba(0,0,0,0.3))",
                    scale: "1.2",
                  }}
                />
                <span className="font-bold text-2xl md:text-3xl text-red-700 bg-amber-100 px-2 md:px-3 py-1 rounded-full">
                  {animatedScores[index]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

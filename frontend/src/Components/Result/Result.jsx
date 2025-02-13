import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Card from "./components/Card";
import MarksCard from "./components/MarksCard";
import Overlay from "./components/Overlay";

const mockData = {
  "Assignment Marks": [
    { subject: "Mathematics", marks: 85 },
    { subject: "Physics", marks: 78 },
    { subject: "Chemistry", marks: 92 },
  ],
  "Periodical Test 1 Marks": [
    { subject: "Mathematics", marks: 40 },
    { subject: "Physics", marks: 38 },
    { subject: "Chemistry", marks: 45 },
  ],
  "Periodical Test 2 Marks": [
    { subject: "Mathematics", marks: 42 },
    { subject: "Physics", marks: 41 },
    { subject: "Chemistry", marks: 47 },
  ],
  "Internal Practical Marks": [
    { subject: "Mathematics", marks: 90 },
    { subject: "Physics", marks: 85 },
    { subject: "Chemistry", marks: 95 },
  ],
};

function App() {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isCardVisible, setCardVisible] = useState(false);
  const [isMarksVisible, setMarksVisible] = useState(false);

  const showCard = () => {
    setCardVisible(true);
  };

  const closeCard = () => {
    setCardVisible(false);
    setMarksVisible(false);
  };

  const showMarks = (type) => {
    setSelectedType(type);
    setCardVisible(false);
    setMarksVisible(true);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <MainContent onSemesterClick={showCard} />
      {isCardVisible && (
        <Overlay onClick={closeCard}>
          <Card onTypeClick={showMarks} onBack={closeCard} />
        </Overlay>
      )}
      {isMarksVisible && (
        <Overlay onClick={closeCard}>
          <MarksCard
            type={selectedType}
            data={mockData[selectedType]}
            onBack={() => {
              setMarksVisible(false);
              setCardVisible(true);
            }}
          />
        </Overlay>
      )}
    </div>
  );
}

export default App;

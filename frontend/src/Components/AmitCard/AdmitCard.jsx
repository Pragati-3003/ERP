import React from "react";
import userPhoto from "../../assets/user1.jpg";

const AdmitCard = () => {
  return (
    <div className="max-w-4xl mx-auto border-4 border-gray-800 p-8 shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase">BANASTHALI VIDYAPITH</h1>
        <h2 className="text-xl font-semibold mt-2">ADMIT CARD</h2>
        <p className="mt-1">SEMESTER EXAMINATION (December 2024)</p>
      </div>

      {/* Candidate Information */}
      <div className="grid grid-cols-3 gap-8 items-start">
        <div className="col-span-2 space-y-2">
          <p><strong>Roll No. :</strong> 241H0660099</p>
          <p><strong>Enrolment No. :</strong> </p>
          <p><strong>Smartcard Id :</strong> ABMCA24141</p>
          <p><strong>Candidate's Name :</strong> <span className="font-bold">MS. SHWETA SINDHU</span></p>
          <p><strong>Father's Name :</strong> SH. RANBIR</p>
          <p><strong>Mother's Name :</strong> SMT. GUDDI</p>
          <p><strong>Class :</strong> MCA I YEAR</p>
          <p><strong>Hostel Name :</strong> <em>SHRI SHANTA SANGAM</em></p>
        </div>

        {/* Candidate Photo */}
        <div className="text-center">
          <img
            src={userPhoto}
            alt="Candidate"
            className="w-32 h-40 border border-gray-800"
          />
          <p className="mt-2">Candidate's Signature</p>
        </div>
      </div>

      {/* Details of Theory Papers */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold underline">Details of Theory Papers :-</h3>
        <ul className="mt-2 space-y-1">
          <li>CS 308 - Operating Systems</li>
          <li>CS 313 - Software Engineering</li>
          <li>CS 315 - Theory of Computation</li>
          <li>CS 423 - Java Programming</li>
          <li>CS 466 - Data Structures Using C</li>
          <li className="line-through">TSKL 401 - Communication Skills</li>
        </ul>
      </div>

      {/* Instructions */}
      <div className="mt-8 border-t border-gray-800 pt-4">
        <h3 className="text-lg font-semibold underline mb-2">INSTRUCTIONS</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Only students fulfilling the attendance requirement can appear for the examination.</li>
          <li>Report to the examination hall 15 minutes before the exam starts.</li>
          <li>No mobile phones, smartwatches, or bags are allowed inside the examination hall.</li>
          <li>You can carry your own water bottle to the examination hall.</li>
          <li>Bring this admit card in original at the time of examination.</li>
          <li>Check your details on the admit card and report any discrepancies immediately.</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-8 text-right">
        <p className="font-semibold">Secretary</p>
        <p>Banasthali Vidyapith</p>
      </div>
    </div>
  );
};

export default AdmitCard;

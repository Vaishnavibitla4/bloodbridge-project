import  { useState } from "react";


const TYPES = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

// Mapping: donorType -> array of recipient types it can donate to
const COMPATIBILITY = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], // universal donor
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"], // universal recipient
};

export default function CompatibilityInteractive() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (type) => {
    setSelected((t) => (t === type ? null : type));
  };

  const recipients = selected ? new Set(COMPATIBILITY[selected] || []) : new Set();

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-red-600 mb-4">Interactive Compatibility</h3>
        <p className="mb-6 text-gray-700">
          Click a blood packet (donor) to see which blood types it can be safely transfused to.
          Compatible recipients will glow and show a check mark.
        </p>

        {/* Grid of types */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          {TYPES.map((type) => {
            const isSelected = selected === type;
            const isRecipientHighlighted = recipients.has(type);
            return (
              <button
                key={type}
                onClick={() => handleSelect(type)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(type);
                  }
                }}
                className={`relative flex flex-col items-center justify-center p-4 rounded-xl border
                  transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-200
                  ${isSelected ? "bg-red-600 text-white border-red-700 shadow-lg scale-105" : "bg-white text-gray-800 hover:shadow-md"}
                  ${isRecipientHighlighted && !isSelected ? "ring-4 ring-green-200" : ""}`}
                aria-pressed={isSelected}
                aria-label={`Select donor ${type}`}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
                     style={{
                       background: isSelected ? "#fff2f2" : "#ffecec",
                       boxShadow: isSelected ? "0 8px 20px rgba(220,38,38,0.25)" : "0 6px 14px rgba(0,0,0,0.06)"
                     }}>
                  <span className={`font-bold text-lg ${isSelected ? "text-red-600" : "text-red-600"}`}>{type}</span>
                </div>

                <div className="text-sm font-semibold">{isSelected ? "Donor (selected)" : "Donor"}</div>

                {/* small badge if highlighted as recipient */}
                {isRecipientHighlighted && !isSelected && (
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <span className="inline-block w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Visual recipients row (showing compatibility results) */}
        <div className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TYPES.map((type) => {
              const highlighted = selected && recipients.has(type);
              return (
                <div
                  key={type + "-rec"}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-400
                    ${highlighted ? "bg-green-50 border-green-300 shadow-md scale-102" : "bg-gray-50 border-gray-200"}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                    ${highlighted ? "bg-green-400 text-white" : "bg-white text-gray-800"}`}>
                    {type}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{type}</div>
                    <div className="text-xs text-gray-600">
                      {highlighted ? "Compatible" : "Recipient"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanation panel */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left">
          {selected ? (
            <>
              <p className="font-semibold text-gray-800 mb-2">
                {selected} donors can give to:
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {[...recipients].map((r) => (
                  <span key={r} className="text-sm px-2 py-1 bg-red-50 text-red-600 rounded-md border border-red-100">
                    {r}
                  </span>
                ))}
              </div>

              {/* Special messages */}
              {selected === "O-" && (
                <p className="text-sm text-gray-700">
                  <strong>Universal donor:</strong> O- blood (especially O-) can be given to all blood types — extremely valuable in emergencies.
                </p>
              )}
              {selected === "AB+" && (
                <p className="text-sm text-gray-700">
                  <strong>Universal recipient:</strong> AB+ individuals can receive blood from any blood type.
                </p>
              )}
              <div className="mt-3">
                <button
                  onClick={() => setSelected(null)}
                  className="text-sm px-3 py-1 bg-white border rounded-md hover:bg-red-50"
                >
                  Reset
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-2 font-medium">Click any blood packet above to see which blood types it can donate to.</p>
              <p className="text-sm text-gray-600">Tip: Try O- (universal donor) and AB+ (universal recipient).</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

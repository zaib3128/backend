function categorizeIssue(description) {
  const text = description.toLowerCase();

  if (
    text.includes("electric") ||
    text.includes("shock") ||
    text.includes("fire") ||
    text.includes("hazard") ||
    text.includes("danger")
  ) {
    return { category: "Safety", priority: "High" };
  }

  if (
    text.includes("internet") ||
    text.includes("wifi") ||
    text.includes("projector") ||
    text.includes("fan") ||
    text.includes("light")
  ) {
    return { category: "Infrastructure", priority: "Medium" };
  }

  return { category: "Comfort", priority: "Low" };
}

module.exports = categorizeIssue;

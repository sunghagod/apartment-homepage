export interface ReservationData {
  name: string;
  phone: string;
  date: string;
  size?: string;
  message?: string;
}

export async function submitToGoogleSheets(
  data: ReservationData
): Promise<{ result: string }> {
  const url = process.env.GOOGLE_SCRIPT_URL;

  if (!url) {
    throw new Error("GOOGLE_SCRIPT_URL is not configured");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit to Google Sheets");
  }

  return response.json();
}

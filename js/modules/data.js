export async function getAllJobs() {
  const response = await fetch('./data.json');
  const data = await response.json();
  return data;
}

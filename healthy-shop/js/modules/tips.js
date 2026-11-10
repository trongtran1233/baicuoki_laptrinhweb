export async function fetchHealthTip() {
    const tipText = document.getElementById('tipText');
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) throw new Error('Không thể tải API');
        const data = await response.json();
        if (tipText) tipText.textContent = `"${data.slip.advice}"`;
    } catch (error) {
        if (tipText) tipText.textContent = "Uống đủ 2 lít nước và duy trì lối sống lành mạnh mỗi ngày!";
    }
}
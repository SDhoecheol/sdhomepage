document.addEventListener('DOMContentLoaded', () => {
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(quoteForm);
      const data = Object.fromEntries(formData.entries());
      try {
        const res = await fetch('/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          alert('견적 요청이 저장되었습니다.');
          quoteForm.reset();
        } else {
          alert('오류가 발생했습니다.');
        }
      } catch(err) {
        alert('서버 오류.');
      }
    });
  }
});

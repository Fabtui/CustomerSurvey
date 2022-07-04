import Chart from 'chart.js/auto';
import goodImage from '../../assets/images/like.png'
import middleImage from '../../assets/images/middle.png'
import badImage from '../../assets/images/dislike.png'

const chartJs = () => {
  const indexContainer = document.querySelector('.days-container')
  if (indexContainer) {
    const ctx = document.querySelectorAll('#myChart');
    console.log(goodImage);
    const img = new Image(50, 50); // width, height
    img.src = goodImage;
    ctx.forEach(ctx => {
      const good = ctx.dataset.good
      const middle = ctx.dataset.middle
      const bad = ctx.dataset.bad
      const total = ctx.dataset.total
      const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ['', '', '', ''],
              datasets: [{
                  label: 'Nombre de votes',
                  data: [good, middle, good, total],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(0, 0, 0, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(0, 0, 0, 0.8)'
                  ],
                  borderWidth: 1
              }]
          },
        options: {
        }
      });
    });
  }
}

export { chartJs }

// Получаем все элементы с классом "has-tooltip"
var tooltips = document.querySelectorAll('.has-tooltip');
var activeTooltip = null; // Переменная для отслеживания активной подсказки

// Перебираем каждый элемент и добавляем обработчик события "click"
tooltips.forEach(function(tooltip) {
  tooltip.addEventListener('click', function(event) {
    event.preventDefault(); // Отменяем переход по ссылке

    // Проверяем, был ли клик по активной подсказке
    if (activeTooltip !== null && activeTooltip.textContent === tooltip.getAttribute('title')) {
      // Если да, то просто переключаем видимость подсказки и завершаем метод
      activeTooltip.classList.toggle('tooltip_active');
      return;
    }

    // Если клик был по другой подсказке, скрываем активную подсказку, если она есть
    if (activeTooltip !== null) {
      activeTooltip.parentNode.removeChild(activeTooltip);
    }

    // Создаем элемент подсказки
    var tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip';
    tooltipElement.textContent = tooltip.getAttribute('title');

    // Добавляем подсказку перед элементом
    tooltip.parentNode.insertBefore(tooltipElement, tooltip);

    // Получаем позицию элемента, относительно которого нужно позиционировать подсказку
    var tooltipPosition = tooltip.getBoundingClientRect();

    // Устанавливаем позицию подсказки
    tooltipElement.style.left = tooltipPosition.left + 'px';
    tooltipElement.style.top = (tooltipPosition.top + tooltipPosition.height) + 'px';

    // Добавляем класс "tooltip_active", чтобы показать подсказку
    tooltipElement.classList.add('tooltip_active');

    // Устанавливаем текущую подсказку как активную
    activeTooltip = tooltipElement;

    // Добавляем обработчик события "click" на весь документ для скрытия подсказки при клике вне элемента
    document.addEventListener('click', function(event) {
      if (!tooltip.contains(event.target)) {
        if (tooltipElement.parentNode) {
          tooltipElement.parentNode.removeChild(tooltipElement);
          activeTooltip = null;
        }
      }
    });
  });
});

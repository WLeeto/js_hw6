// Получаем все элементы с классом "has-tooltip"
var tooltips = document.querySelectorAll('.has-tooltip');
var activeTooltip = null; // Переменная для отслеживания активной подсказки

// Перебираем каждый элемент и добавляем обработчик события "click"
tooltips.forEach(function(tooltip) {
  tooltip.addEventListener('click', function(event) {
    event.preventDefault(); // Отменяем переход по ссылке

    // Если есть активная подсказка, скрываем ее
    if (activeTooltip !== null) {
      activeTooltip.classList.remove('tooltip_active');
    }

    // Если текущий элемент является активной подсказкой, сбрасываем переменную activeTooltip и завершаем функцию
    if (activeTooltip === tooltip.nextElementSibling) {
      activeTooltip = null;
      return;
    }

    // Создаем элемент подсказки
    var tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip';
    tooltipElement.textContent = tooltip.getAttribute('title');

    // Получаем значение атрибута data-position
    var position = tooltip.getAttribute('data-position');

    // Устанавливаем позицию подсказки в зависимости от значения атрибута data-position
    if (position === 'top') {
      tooltipElement.style.bottom = '100%';
    } else if (position === 'left') {
      tooltipElement.style.right = '100%';
    } else if (position === 'right') {
      tooltipElement.style.left = '100%';
    } else if (position === 'bottom') {
      tooltipElement.style.top = '100%';
    }

    // Добавляем подсказку перед элементом
    tooltip.parentNode.insertBefore(tooltipElement, tooltip);

    // Добавляем класс "tooltip_active", чтобы показать подсказку
    tooltipElement.classList.add('tooltip_active');

    // Устанавливаем текущую подсказку как активную
    activeTooltip = tooltipElement;
  });
});

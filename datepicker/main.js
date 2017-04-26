(() => {
    let datepicker = window.datepicker;
    let monthData;
    let $wrapper;

    datepicker.buildUi = (year, month) => {
        monthData = datepicker.getMonthData(year, month);
        

        let html = 
            '<div class="ui-datepick-header">' +
                '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn ">&lt;</a>' +
                '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
                '<span class="ui-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>' +
            '</div>' +
            '<div class="ui-datepick-body">' +
                '<table>' +
                    '<thead>' +
                        '<tr>' +
                            '<th>一</th>' +
                            '<th>二</th>' +
                            '<th>三</th>' +
                            '<th>四</th>' +
                            '<th>五</th>' +
                            '<th>六</th>' +
                            '<th>日</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>';

                    for(let i = 0; i < monthData.days.length; i++) {
                        const date = monthData.days[i];
                       
                        if(i % 7 === 0) {
                            html += '<tr>';
                        }

                        html += '<td data-date="' + date.date + '">' + date.showDate + '</td>';

                        if(i % 7 === 6) {
                            html += '</tr>';
                        }
                    }

                    html += '</tbody>' +
                '</table>' +
            '</div>';

            return html;
    };

    datepicker.render = (direction) => {
        let year, month;
        if(monthData) {
            year = monthData.year;
            month = monthData.month;
        }
        
        if(direction === 'prev') month--;
        if(direction === 'next') month++;

        console.log('month: ' + month)

        let html = datepicker.buildUi(year, month);
        // <div class="ui-datepick-wrapper">

        if(!$wrapper) {
            $wrapper = document.createElement('div');
            $wrapper.className = 'ui-datepick-wrapper';
        }

        $wrapper.innerHTML = html;

        document.body.appendChild($wrapper);
    }

    datepicker.init = (input) => {
        datepicker.render();

        const $input = document.querySelector(input);
        let isOpen = false;

        $input.addEventListener('click', () => {
            if(isOpen) {
                $wrapper.classList.remove('ui-datepick-wrapper-show');
                isOpen = false;
            } else {
                $wrapper.classList.add('ui-datepick-wrapper-show');

                const left = $input.offsetLeft;
                const top = $input.offsetTop;
                const height = $input.offsetHeight;

                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left + 'px';
                isOpen = true;
            }
        })

        //事件委托，
        $wrapper.addEventListener('click', (e) => {
            const $target = e.target;

            if(!$target.classList.contains('ui-datepicker-btn'))    
                return;
                
            if($target.classList.contains('ui-datepicker-prev-btn')) {
                datepicker.render('prev');
            } else if($target.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render('next');
            }
        });

        $wrapper.addEventListener('click', (e) => {
            const $target = e.target;

            if($target.tagName.toLowerCase() !== 'td') return;

            const  date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);

            $input.value = format(date);

            $wrapper.classList.remove('ui-datepick-wrapper-show');
            isOpen = false;
        })
    }

    function format(date) {
        ret = '';

        const padding = (num) => {
            if(num <= 9) {
                return '0' + num;
            }
            return num;
        }

        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate());
        return ret;
    }

})();
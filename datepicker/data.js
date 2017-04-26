(() => {
    let datepicker = {};

    datepicker.getMonthData = (year, month) => {
        let ret = [];

        if(!year || !month) {
            const today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }

        //获取一个月的第一天
        const  firstDay = new Date(year, month - 1, 1);
        //第一天是星期几
        let firstDayWeekDay = firstDay.getDay();
        //如果是星期天
        if(firstDayWeekDay === 0) firstDayWeekDay = 7;

        //重新获取年月
        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        //获取上个月的最后一天
        const lastDayOfLastMonth = new Date(year, month - 1, 0);
        //将上个月的最后一天的日期保存到一个变量
        const lastDateOfLastMonth = lastDayOfLastMonth.getDate();

        //要显示上个月多少天,比如这个月第一天为星期3，就要显示上个月月末两天
        const preMonthDayCount = firstDayWeekDay - 1;

        //获取本月最后一天
        const lastDay = new Date(year, month, 0);
        const lastDate = lastDay.getDate();

        //每一个月在日历中显示可能为4~6周
        for(let i = 0; i < 7 * 6; i++) {
            //计算每一天的真实日期,
            //比如1号是周二，上一月有一天，i=1才是这一天数据
            // 在比如2号，为第三个数据，i = 2;
            const date = i + 1 - preMonthDayCount;
            let showDate = date; //用来显示日期，默认为date
            let thisMonth = month;

            if(date <= 0) {
                //上一个月
                thisMonth = month -1;
                showDate = lastDateOfLastMonth + date;
            } else if(date > lastDate) {
                //下一个月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }

            if(thisMonth === 0) thisMonth =12;
            if(thisMonth === 13) thisMonth =1;

            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            });
        }

        return {
            year: year,
            month: month,
            days: ret
        };
    };


    window.datepicker = datepicker;
})();
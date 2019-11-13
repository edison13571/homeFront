import Moment from 'moment';
import _ from 'lodash';

export function createTimeSeries(timeSeriesArray,timesStampName) {
  const timeSeriesObj={
    array:timeSeriesArray.map(function (item) {
        item.moment=Moment(item[timesStampName])
        return item
      }
    ),
    groupByFormat(formatPattern){
      return _.groupBy(timeSeriesObj.array,item=>item.moment.format(formatPattern))
    },
    groupByDate(){
      const groupedResult={
        map:timeSeriesObj.groupByFormat("YYYY-MM-DD"),
        dates(){
          return _.keys(groupedResult.map)
        },
        sum(date,name){
          return groupedResult.map[date]?_.sumBy(groupedResult.map[date],name):0
        }
      }
      return groupedResult
    },
    groupByWeek(){
      const groupedResult={
        map:timeSeriesObj.groupByFormat("YYYY-ww"),
        dates(){
          return _.keys(groupedResult.map)
        },
        sum(date,name){
          return groupedResult.map[date]?_.sumBy(groupedResult.map[date],name):0
        }
      }
      return groupedResult;
    },
    groupByMonth(){
      const groupedResult={
        map:timeSeriesObj.groupByFormat("YYYY-MM"),
        dates(){
          return _.keys(groupedResult.map)
        },
        sum(date,name){
          return groupedResult.map[date]?_.sumBy(groupedResult.map[date],name):0
        }
      }
      return groupedResult;
    },
  }
  return timeSeriesObj
}

export function dateList() {
  let thisWeek=Moment();
  let lastWeek=Moment().subtract(1,"w");
  let lastMonth=Moment().subtract(1,"M");
  function weekDate(startTime) {
    let time=startTime
    let arr=[time.format("YYYY-MM-DD")];
    for(let i=0;i<6;i++){
      arr.push(time.add(1,"day").format("YYYY-MM-DD"))
    }
    return arr
  }
  let thisWeekDate=weekDate(thisWeek.startOf("week"));
  let lastWeekDate=weekDate(lastWeek.startOf("week"));
  return {
    thisWeek:thisWeek.format("YYYY-WW"),
    lastWeek:lastWeek.format("YYYY-WW"),
    thisWeekDate:thisWeekDate,
    lastWeekDate:lastWeekDate,
    thisMonth:thisWeek.format("YYYY-MM"),
    lastMonth:lastMonth.format("YYYY-MM"),
  }
}

export function dateDataList() {

}

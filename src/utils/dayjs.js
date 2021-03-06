
/* 
初始化  dayjs 相关配置
*/
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

//配置使用处理相对时间
dayjs.extend(relativeTime)

//配置使用中文语言包
dayjs.locale('zh-cn')

Vue.filter('relativeTime', (value) => dayjs(value).from(dayjs()))


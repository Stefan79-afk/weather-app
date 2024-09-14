import { Current } from "./current"

export const mockCurrent: Current = {
    location: {
        name: 'Test City',
        region: 'Test Region',
        country: 'Test Country',
        lat: 20,
        lon: 20,
        tz_id: 'Test/Timezone',
        localtime_epoch: 1234567890,
        localtime: '2023-01-01 12:00'
    },
      current: {
        temp_c: 25,
        temp_f: 79,
        is_day: 1,
        last_updated: "now",
        last_updated_epoch: 12412541251,
        condition: {
          text: 'Sunny',
          icon: 'sunny.png',
          code: 1000
        },

       wind_mph: 12,
       wind_kph: 6,
       wind_degree: 12,
       wind_dir: "south",
       pressure_mb: 1,
       pressure_in: 1,
       precip_mm: 1,
       precip_in: 1,
       humidity: 12,
       cloud: 2,
       feelslike_c: 24,
       feelslike_f: 78,
       windchill_c: 3,
       windchill_f: 3,
       heatindex_c: 3,
       heatindex_f: 12,
       dewpoint_c: 12,
       dewpoint_f: 12,
       vis_km: 12,
       vis_miles: 12,
       uv: 12,
       gust_mph: 12,
       gust_kph: 12,
    }
}
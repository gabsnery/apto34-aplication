declare module 'react-leaflet-draw'
declare module 'leaflet-measure'
declare module 'leaflet-draw'
declare module 'leaflet-kmz'
declare module 'shpjs'
declare module 'jszip'
declare module 'jszip-utils'
declare module 'react-leaflet-control'
declare module 'react-leaflet-markercluster'
declare module 'react-hook-geolocation'
declare module 'geoblaze'
declare module '@mapbox/togeojson'
declare module 'react-google-recaptcha'
declare module 'date-fns/constants'
declare module '@fullcalendar/common'
declare module '*.pdf'
declare module '@fullcalendar/react' {
  export type EventContentArg = any
  const content: any
  export default content
}

declare namespace L {
  export namespace Control {
    export let Measure: any
    export let Draw: any
  }
  export namespace GeometryUtil {
    export let geodesicArea: any
  }
  export namespace control {
    export let measure: any
    export let draw: any
    export let sideBySide: any
  }
  export namespace Draw {
    export namespace Event {
      export let CREATED: any
      export let EDITED: any
      export let DELETED: any
    }
  }
  export let KMZParser: any
}

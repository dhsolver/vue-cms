import Vue from 'vue'
import VCalendar from 'v-calendar';

Vue.use(VCalendar, {
    /**
     * Day number for the first day of the week (1: Sun - 7: Sat)
     */
    firstDayOfWeek: 1, // Sunday,

    /**
     * Visibility state for calendar navigation
     * panel ("focus", "hover", "visible", "hidden")	
     */
    // navVisibility: 'focus',

    /**
     * Background color of the selected and dragged
     * highlighted regions (opacity: 0.5 for dragged).
     * This setting is overridden by select-attribute
     * and drag-attribute if specified.
     */
    datePickerTintColor: '#61bc8b',

    /**
     * Show popover for dragged and selected regions.
     */
    datePickerShowDayPopover: false,

    /**
     * Formats to use when display and parsing dates
     * for various calendar sections.
     */
    formats: {
        title: 'MMM YYYY',
        weekdays: 'W',
        navMonths: 'MMM',
        input: ['MMM DD, YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'], // Only for `v-date-picker`
        dayPopover: 'L', // Only for `v-date-picker`
        data: ['MMM DD, YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'] // For attribute dates
    }
});

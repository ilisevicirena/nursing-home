import { SCHEDULE_VIEW } from "../resources/mode-enums";
export interface ScheduleDay {
    date: Date;
    isFromCurrentMonth: boolean;
    today: boolean;
    events: ScheduleEventExtended[];
}
export interface ScheduleWeek {
    days: ScheduleDay[];
    datesStringfy: string[];
    firstDay: Date;
    lastDay: Date;
    events: ScheduleEventExtended[];
}
export interface ScheduleMonth {
    shortName: string;
    name: string;
    key: number;
}
export interface ScheduleEvent {
    id: string;
    start: Date;
    end: Date;
    title: string;
    color?: string;
    description?: string;
}
export interface ScheduleEventExtended extends ScheduleEvent {
    firstDayOfEvent: boolean;
    eventDates: Date[];
    eventDatesStringfy: string[];
    width: string;
    top: string;
    hasBreak: boolean;
    breakingDates: Date[];
    breakinfDatesStringfy: string[];
    startsThisWeek: boolean;
    endsThisWeek: boolean;
    lastsWholeWeek: boolean;
}
export interface ViewToggleButton {
    title: string;
    view: SCHEDULE_VIEW;
    isActive: boolean;
}

import { OnInit, IterableDiffers, EventEmitter, AfterViewInit } from '@angular/core';
import { ScheduleDay, ScheduleEvent, ScheduleMonth, ScheduleWeek, ViewToggleButton } from '../models/schedule.model';
import { NbComponentStatus, NbFlipCardComponent, NbTagAppearance } from '@nebular/theme';
import { SCHEDULE_VIEW } from '../resources/mode-enums';
import { TranslationService } from '../resources/translation.service';
import * as i0 from "@angular/core";
export declare class ScheduleComponent implements OnInit, AfterViewInit {
    private locale;
    private iterableDiffers;
    private translationService;
    private eventsExended;
    private iterableDiffer;
    private numOfChecks;
    currentYear: number;
    currentMonth: number;
    currentDay: number;
    currentScheduleDay: ScheduleDay;
    weeks: ScheduleWeek[];
    days: string[];
    months: ScheduleMonth[];
    years: number[];
    views: typeof SCHEDULE_VIEW;
    avaliableViews: ViewToggleButton[];
    currentWeekIndex: number;
    currentMonthDays: number[];
    monthFlipCard: NbFlipCardComponent;
    weekFlipCard: NbFlipCardComponent;
    startYear: number;
    endYear: number;
    eventTagAppereance: NbTagAppearance;
    events: ScheduleEvent[];
    startingMonth: number | undefined;
    startingYear: number | undefined;
    showYearPicker: boolean;
    markToday: boolean;
    nextMonthTooltip: string;
    previousMonthTooltip: string;
    todayBtnTitle: string;
    addNewBtnTitle: string;
    showTodayBtn: boolean;
    showAddNewBtn: boolean;
    addNewBtnTooltip: string;
    todayBtnTooltip: string;
    activeView: SCHEDULE_VIEW;
    eventStart: string;
    eventEnd: string;
    eventTitle: string;
    eventDescription: string;
    /**
     * @returns current selected calendar year as number
     * @emits on selection change in years select box
     */
    yearSelectionChanged: EventEmitter<number>;
    /**
     * @returns current selected calendar month as number 1-12
     * @emits on month toggle buttons press
     */
    monthSelectionChanged: EventEmitter<number>;
    /**
     * @returns current selected calendar day as number 1-30/31
     * @emits on day button press when active view is day
     */
    daySelectionChanged: EventEmitter<number>;
    /**
     * @returns clicked event
     * @emits on event tag click
     */
    eventClicked: EventEmitter<ScheduleEvent>;
    /**
     *
     * @returns nothing
     * @emits on add new click
     */
    addNewClicked: EventEmitter<boolean>;
    /**
     *
     * @returns nothing
     * @emits on today new click
     */
    todayClicked: EventEmitter<boolean>;
    constructor(locale: string, iterableDiffers: IterableDiffers, translationService: TranslationService);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngAfterViewInit(): void;
    /**
     * @returns array of dates between two dates (including start and end date)
     * @param start starting date for range
     * @param end ending date for range
     */
    private getDatesInRange;
    /**
     * @returns array of ScheduleEvent objects with current month events
     */
    private getCurrentMonthEvents;
    /**
     * @description builds eventExtended array of ScheduleEventExtended from ScheduleEvent type for current month events. Sorts events from earliest to latest.
     */
    private setUpEventExtended;
    /**
     *
     * @param date date to be stringfied
     * @returns string with date in format yyyy-m-d, month in number format 0-11, date in number format 1-30/31
     */
    private stringfyDate;
    /**
     *
     * @param d date in desired week (any date in desired week)
     * @returns first day of week as Date
     */
    private getFirstDayOfWeek;
    /**
     *
     * @param year current year as number
     * @param month_number current month as number
     * @returns number of weeks in month according to given month and year
     */
    private weekCount;
    /**
     *
     * @param year current year as number
     * @param month current month as number
     * @returns array of ScheduleWeek objects with formated weeks for current year and month
     */
    private getWeeksSource;
    /**
     *
     * @param weeks ScheduleWeek array with weeks to be filled with day objects
     * @returns ScheduleWeek array of objects with weeks, days and events for current year and month
     */
    private fillWeeksWithDays;
    /**
     *
     * @param current current day as Date
     * @returns ScheduleWeek from given day with 0 events and 0 days
     */
    private formatWeekFromDay;
    /**
     *
     * @param weeks ScheduleWeek array to be modified
     * @returns ScheduleWeek array of objects with set up events
     * @description breks multi week events into parts, if event starts and ends this week adds ordinary event to week events,
     * if event only starts this week -> adds week last day to event breaking dates and sets up startsThisWeek flag, if event only ends this week -> adds week first day
     * to event breaking dates and sets up endsThisWeek flag, if event lasts whole week -> adds week first and last day to event breaking dates and sets up
     * lastsWholeWeek flag. Important function for tag width and spaceing rendering.
     */
    private breakMultiWeekEvents;
    /**
     *
     * @param locale current locale for date pipe
     * @returns array of strings with week days names
     */
    private getWeekDaysNames;
    /**
     *
     * @param locale current locale for date pipe
     * @returns ScheduleMonth array with current year months
     */
    private getMonthNames;
    /**
     *
     * @returns array of years in given range as numbers
     */
    private getYearsInRange;
    /**
     *
     * @param event current ScheduleEventExtended to be rendered
     * @returns width of event tag as string
     * @description calculates event tag width for current event based on event breaking dates. If event lasts whole week sets up tag width to 7 days,
     * if event only starts this week takes first breaking date and counts number of days before first break --> sets up tag width to number of days before first break,
     * if event only ends this week takes last breaking date and counts number of days after last break --> sets up tag width to number of days after last break.
     */
    private calculateEventTagWidth;
    /**
     *
     * @param event current ScheduleEventExteded
     * @param week current ScheduleWeek
     * @returns top position of current event tag as string based on number of events this week
     * @description calculates tag top position based on events position in week events
     */
    private calculateEventTagTop;
    /**
     *
     * @param key key of month as number
     * @returns month name as string based on provided key
     */
    getMonthNameByKey(key: number): string;
    /**
     * @description repaints and refreshes calendar
     * @param restartOnToday boolean flag to restart calendar on today date
     * @default restartOnToday false
     */
    refresh(restartOnToday?: boolean): void;
    /**
     *
     * @returns ScheduleDay if day exists in weeks array or undefined if not found
     */
    findCurrentScheduleDay(): ScheduleDay | undefined;
    /**
     *
     * @param year current year as number
     * @param month current month as number
     * @returns array of numbers with given month days
     */
    getCurrentMonthDays(year: number, month: number): number[];
    /**
     *
     * @param week current week as ScheduleWeek
     * @returns row height as string
     * @description calculates row height based on number of week events, applied only if calculated height greater then default row height
     */
    calculateWeekRowHeight(week: ScheduleWeek): string;
    /**
     *
     * @param hex hex value of color as string
     * @returns color RGBA as string
     * @description converts color hex to RGBA for event tag
     */
    hexToRgbA(hex: string | undefined): string;
    /**
     *
     * @returns current visible calendar month in number format 1-12
     */
    getCurrentVisibleMonth(): number;
    /**
     *
     * @returns current visible calendar year in number format
     */
    getCurrentVisibleYear(): number;
    /**
     *
     * @param date date to be formated
     * @param format format for date
     * @returns formated date as string based on current locale and given format
     */
    formatDate(date: Date, format: string): string;
    /**
     *
     * @param next flag that marks if next or previous moth is clicked
     * @description sets currentMonth value according to button pressed, if month is 11 resets months to 0. If month is 0 resets months to 11.
     */
    toggleMonth(next: boolean): void;
    /**
     * @description listens to year select box selection change and refreshes view.
     */
    onYearSelectedChange(): void;
    /**
     *
     * @param day current ScheduleDay thats resized
     * @param week current ScheduleWeek thats resized
     * @description recalculates event width and top position according to new resized mesures
     */
    onDayResized(day: ScheduleDay, week: ScheduleWeek): void;
    /**
     * @description resets currentMonth and currentYear on today date and refreshes view with today date.
     */
    goOnToday(): void;
    /**
     *
     * @param btn ViewToggleButton thats clicked
     * @description toggles selected view and refresh current view
     */
    toggleView(btn: ViewToggleButton): void;
    /**
     *
     * @param next flag that indicates if next or previous week button is clicked
     * @description toggles week view and refreshes calendar view according to new selected week. If current week is last in current month then toggles next month.
     * If current week is first in month then toggles previous month. If last week is already on screen skips one week in previous month.
     */
    toggleWeek(next: boolean): void;
    /**
     *
     * @param stat string with status text
     * @returns NbComponentStatus type
     * @description converts string to NbComponentStatus, if hex color is given then returns default basic status
     */
    convertToStatus(stat: string): NbComponentStatus;
    /**
     *
     * @param month current ScheduleMonth
     * @description refreshes view according to new month selected
     */
    toggleMonthDay(month: ScheduleMonth): void;
    /**
     *
     * @param day current day as number
     * @description toggles current day and refreshes view according to new day selected (only if DAY view is active)
     */
    toggleDay(day: number): void;
    /**
     *
     * @param event schedule event thats clicked
     * @description fires eventClicked event
     */
    onEventClick(event: ScheduleEvent): void;
    /***
     * @description emits add new click event
     */
    onAddNewClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScheduleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScheduleComponent, "ngx-schedule", never, { "startYear": "startYear"; "endYear": "endYear"; "eventTagAppereance": "eventTagAppereance"; "events": "events"; "startingMonth": "startingMonth"; "startingYear": "startingYear"; "showYearPicker": "showYearPicker"; "markToday": "markToday"; "nextMonthTooltip": "nextMonthTooltip"; "previousMonthTooltip": "previousMonthTooltip"; "todayBtnTitle": "todayBtnTitle"; "addNewBtnTitle": "addNewBtnTitle"; "showTodayBtn": "showTodayBtn"; "showAddNewBtn": "showAddNewBtn"; "addNewBtnTooltip": "addNewBtnTooltip"; "todayBtnTooltip": "todayBtnTooltip"; "activeView": "activeView"; "eventStart": "eventStart"; "eventEnd": "eventEnd"; "eventTitle": "eventTitle"; "eventDescription": "eventDescription"; }, { "yearSelectionChanged": "yearSelectionChanged"; "monthSelectionChanged": "monthSelectionChanged"; "daySelectionChanged": "daySelectionChanged"; "eventClicked": "eventClicked"; "addNewClicked": "addNewClicked"; "todayClicked": "todayClicked"; }, never, never, false, never>;
}

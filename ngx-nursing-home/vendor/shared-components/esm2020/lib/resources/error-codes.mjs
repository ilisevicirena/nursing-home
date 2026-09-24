export function getError(code) {
    var err = errors.find((x) => x.code == code);
    var error = 'Error ' + code + ': ' + err?.message;
    return err ? error : 'Unknown error ' + code;
}
var errors = [
    // file error codes starting with 100
    { code: 101, message: 'File type is not supported for preview.' },
    { code: 102, message: 'Multiple files not allowed.' },
    { code: 103, message: 'File download settings are not properly set.' },
    { code: 104, message: 'File preview settings are not properly set.' },
    {
        code: 105,
        message: 'Server endpoint responded with error. No file data provided.',
    },
    { code: 106, message: 'File bytes attribute is not properly set.' },
    // smart table error codes starting with 200
    {
        code: 201,
        message: 'User picture from server settings are not properly set.',
    },
    {
        code: 202,
        message: 'Server endpoint responded with error. No picture data provided.',
    },
    { code: 203, message: 'Select editor server endpoint is not properly set.' },
    {
        code: 204,
        message: 'Select editor server endpoint responded with error. No data provided.',
    },
    { code: 205, message: 'Select filter server endpoint is not properly set.' },
    {
        code: 206,
        message: 'Select filter server endpoint responded with error. No data provided.',
    },
    //select grid combo error codes starting with 300
    { code: 301, message: 'Value attribute name must be set.' },
    {
        code: 302,
        message: 'Can not assign array to selected items when select-grid mode is not multiple. Assign single key instead.',
    },
    {
        code: 303,
        message: 'Can not assign string to selected items. Assign array of keys instead.',
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItY29kZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zaGFyZWQtY29tcG9uZW50cy9zcmMvbGliL3Jlc291cmNlcy9lcnJvci1jb2Rlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQVk7SUFDbkMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQztJQUMxRCxJQUFJLEtBQUssR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHLEVBQUUsT0FBTyxDQUFDO0lBQ2xELE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztBQUMvQyxDQUFDO0FBRUQsSUFBSSxNQUFNLEdBQWtCO0lBQzFCLHFDQUFxQztJQUNyQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLHlDQUF5QyxFQUFFO0lBQ2pFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUU7SUFDckQsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSw4Q0FBOEMsRUFBRTtJQUN0RSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLDZDQUE2QyxFQUFFO0lBQ3JFO1FBQ0UsSUFBSSxFQUFFLEdBQUc7UUFDVCxPQUFPLEVBQUUsOERBQThEO0tBQ3hFO0lBQ0QsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRTtJQUVuRSw0Q0FBNEM7SUFDNUM7UUFDRSxJQUFJLEVBQUUsR0FBRztRQUNULE9BQU8sRUFBRSx5REFBeUQ7S0FDbkU7SUFDRDtRQUNFLElBQUksRUFBRSxHQUFHO1FBQ1QsT0FBTyxFQUFFLGlFQUFpRTtLQUMzRTtJQUNELEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsb0RBQW9ELEVBQUU7SUFDNUU7UUFDRSxJQUFJLEVBQUUsR0FBRztRQUNULE9BQU8sRUFDTCx1RUFBdUU7S0FDMUU7SUFDRCxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLG9EQUFvRCxFQUFFO0lBQzVFO1FBQ0UsSUFBSSxFQUFFLEdBQUc7UUFDVCxPQUFPLEVBQ0wsdUVBQXVFO0tBQzFFO0lBRUQsaURBQWlEO0lBQ2pELEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsbUNBQW1DLEVBQUU7SUFDM0Q7UUFDRSxJQUFJLEVBQUUsR0FBRztRQUNULE9BQU8sRUFDTCwwR0FBMEc7S0FDN0c7SUFDRDtRQUNFLElBQUksRUFBRSxHQUFHO1FBQ1QsT0FBTyxFQUNMLHdFQUF3RTtLQUMzRTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIENvZGVNZXNzYWdlIHtcclxuICBjb2RlOiBudW1iZXI7XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXJyb3IoY29kZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICB2YXIgZXJyID0gZXJyb3JzLmZpbmQoKHg6IENvZGVNZXNzYWdlKSA9PiB4LmNvZGUgPT0gY29kZSk7XHJcbiAgdmFyIGVycm9yID0gJ0Vycm9yICcgKyBjb2RlICsgJzogJyArIGVycj8ubWVzc2FnZTtcclxuICByZXR1cm4gZXJyID8gZXJyb3IgOiAnVW5rbm93biBlcnJvciAnICsgY29kZTtcclxufVxyXG5cclxudmFyIGVycm9yczogQ29kZU1lc3NhZ2VbXSA9IFtcclxuICAvLyBmaWxlIGVycm9yIGNvZGVzIHN0YXJ0aW5nIHdpdGggMTAwXHJcbiAgeyBjb2RlOiAxMDEsIG1lc3NhZ2U6ICdGaWxlIHR5cGUgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJldmlldy4nIH0sXHJcbiAgeyBjb2RlOiAxMDIsIG1lc3NhZ2U6ICdNdWx0aXBsZSBmaWxlcyBub3QgYWxsb3dlZC4nIH0sXHJcbiAgeyBjb2RlOiAxMDMsIG1lc3NhZ2U6ICdGaWxlIGRvd25sb2FkIHNldHRpbmdzIGFyZSBub3QgcHJvcGVybHkgc2V0LicgfSxcclxuICB7IGNvZGU6IDEwNCwgbWVzc2FnZTogJ0ZpbGUgcHJldmlldyBzZXR0aW5ncyBhcmUgbm90IHByb3Blcmx5IHNldC4nIH0sXHJcbiAge1xyXG4gICAgY29kZTogMTA1LFxyXG4gICAgbWVzc2FnZTogJ1NlcnZlciBlbmRwb2ludCByZXNwb25kZWQgd2l0aCBlcnJvci4gTm8gZmlsZSBkYXRhIHByb3ZpZGVkLicsXHJcbiAgfSxcclxuICB7IGNvZGU6IDEwNiwgbWVzc2FnZTogJ0ZpbGUgYnl0ZXMgYXR0cmlidXRlIGlzIG5vdCBwcm9wZXJseSBzZXQuJyB9LFxyXG5cclxuICAvLyBzbWFydCB0YWJsZSBlcnJvciBjb2RlcyBzdGFydGluZyB3aXRoIDIwMFxyXG4gIHtcclxuICAgIGNvZGU6IDIwMSxcclxuICAgIG1lc3NhZ2U6ICdVc2VyIHBpY3R1cmUgZnJvbSBzZXJ2ZXIgc2V0dGluZ3MgYXJlIG5vdCBwcm9wZXJseSBzZXQuJyxcclxuICB9LFxyXG4gIHtcclxuICAgIGNvZGU6IDIwMixcclxuICAgIG1lc3NhZ2U6ICdTZXJ2ZXIgZW5kcG9pbnQgcmVzcG9uZGVkIHdpdGggZXJyb3IuIE5vIHBpY3R1cmUgZGF0YSBwcm92aWRlZC4nLFxyXG4gIH0sXHJcbiAgeyBjb2RlOiAyMDMsIG1lc3NhZ2U6ICdTZWxlY3QgZWRpdG9yIHNlcnZlciBlbmRwb2ludCBpcyBub3QgcHJvcGVybHkgc2V0LicgfSxcclxuICB7XHJcbiAgICBjb2RlOiAyMDQsXHJcbiAgICBtZXNzYWdlOlxyXG4gICAgICAnU2VsZWN0IGVkaXRvciBzZXJ2ZXIgZW5kcG9pbnQgcmVzcG9uZGVkIHdpdGggZXJyb3IuIE5vIGRhdGEgcHJvdmlkZWQuJyxcclxuICB9LFxyXG4gIHsgY29kZTogMjA1LCBtZXNzYWdlOiAnU2VsZWN0IGZpbHRlciBzZXJ2ZXIgZW5kcG9pbnQgaXMgbm90IHByb3Blcmx5IHNldC4nIH0sXHJcbiAge1xyXG4gICAgY29kZTogMjA2LFxyXG4gICAgbWVzc2FnZTpcclxuICAgICAgJ1NlbGVjdCBmaWx0ZXIgc2VydmVyIGVuZHBvaW50IHJlc3BvbmRlZCB3aXRoIGVycm9yLiBObyBkYXRhIHByb3ZpZGVkLicsXHJcbiAgfSxcclxuXHJcbiAgLy9zZWxlY3QgZ3JpZCBjb21ibyBlcnJvciBjb2RlcyBzdGFydGluZyB3aXRoIDMwMFxyXG4gIHsgY29kZTogMzAxLCBtZXNzYWdlOiAnVmFsdWUgYXR0cmlidXRlIG5hbWUgbXVzdCBiZSBzZXQuJyB9LFxyXG4gIHtcclxuICAgIGNvZGU6IDMwMixcclxuICAgIG1lc3NhZ2U6XHJcbiAgICAgICdDYW4gbm90IGFzc2lnbiBhcnJheSB0byBzZWxlY3RlZCBpdGVtcyB3aGVuIHNlbGVjdC1ncmlkIG1vZGUgaXMgbm90IG11bHRpcGxlLiBBc3NpZ24gc2luZ2xlIGtleSBpbnN0ZWFkLicsXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb2RlOiAzMDMsXHJcbiAgICBtZXNzYWdlOlxyXG4gICAgICAnQ2FuIG5vdCBhc3NpZ24gc3RyaW5nIHRvIHNlbGVjdGVkIGl0ZW1zLiBBc3NpZ24gYXJyYXkgb2Yga2V5cyBpbnN0ZWFkLicsXHJcbiAgfSxcclxuXTtcclxuIl19
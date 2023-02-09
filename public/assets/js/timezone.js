let localOperatingTimelet;
let uctOperatingTime;
localOperatingTimelet = getId('local-operating-time');
uctOperatingTime = getId('uct-operating-time');

function convertTimeToInternationalStart(time, country, targetTimezone) {
    if (time) {
        const date = new Date();
        const [hours, minutes] = time.split(':');
    
        date.setHours(hours);
        date.setMinutes(minutes);
    
        let tzoffset;
        switch (targetTimezone) {
            case 'UTC':
                tzoffset = 0;
                break;
            case 'EST':
                tzoffset = -300;
                break;
            case 'CST':
                tzoffset = -360;
                break;
            case 'MST':
                tzoffset = -420;
                break;
            case 'PST':
                tzoffset = -480;
                break;
            default:
                tzoffset = 0;
        }
    
        // Determine the time zone offset for the specified country
        switch (country) {
            case 'Philippines':
                tzoffset -= 480;
                break;
            // Add cases for other countries here
            default:
                tzoffset = 0;
        }
    
        date.setMinutes(date.getMinutes() + tzoffset);
    
        //return date.toLocaleString();
        const result = date.toLocaleTimeString();
        return result.slice(0, 5);
    }

}

function convertTimeToInternationalEnd(time, country, targetTimezone) {
    if (time) {
        const date = new Date();
        const [hours, minutes] = time.split(':');
    
        date.setHours(hours);
        date.setMinutes(minutes);
    
        let tzoffset;
        switch (targetTimezone) {
            case 'UTC':
                tzoffset = 0;
                break;
            case 'EST':
                tzoffset = -300;
                break;
            case 'CST':
                tzoffset = -360;
                break;
            case 'MST':
                tzoffset = -420;
                break;
            case 'PST':
                tzoffset = -480;
                break;
            default:
                tzoffset = 0;
        }
    
        // Determine the time zone offset for the specified country
        switch (country) {
            case 'Philippines':
                tzoffset -= 480;
                break;
            // Add cases for other countries here
            default:
                tzoffset = 0;
        }
    
        date.setMinutes(date.getMinutes() + tzoffset);
    
        //return date.toLocaleString();
        const result = date.toLocaleTimeString();
        return result.slice(0, 5);
    }
}

//// Example usage
//   const localTime = "23:00";
//   const country = "Philippines";
//   const targetTimezone = "UTC";
//   console.log(convertTimeToInternational(localTime, country, targetTimezone));

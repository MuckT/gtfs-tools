import { Component } from '@angular/core';

@Component({
  selector: 'gtfs-tools-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'json-schema-validation';
  fileToUpload: File = null;
  selectedSchema = 0;
  // Schemas
  // Agency Schema
  agencySchema = {
    "type": "array",
    "title": "The agency.txt Schema",
    "uniqueItems": true,
    "description": "A schema to validate agency.txt files converted to json object arrays",
    "items": {
      "allOf": [
        {
          "type": "object",
          "required": [
              "agency_name",
              "agency_url",
              "agency_timezone"
          ],
          "properties": {
            "agency_id": {
              "type": "string",
              "title": "Agency ID",
              "description": "The agency_id field is an ID that uniquely identifies a transit agency. A transit feed may represent data from more than one agency. The agency_id is dataset unique.",
            },
            "agency_name": {
              "type": "string",
              "title": "Agency Name",
              "description": "The agency_name field contains the full name of the transit agency. Google Maps will display this name.",
            },
            "agency_url": {
              "type": "string",
              "title": "Agency URL",
              "description": "Contains the URL of the transit agency. The value must be a fully qualified URL that includes http:// or https://, and any special characters in the URL must be correctly escaped. See http://www.w3.org/Addressing/URL/4_URI_Recommentations.html for a description of how to create fully qualified URL values.",
              "format": "uri"
            },
            "agency_timezone": {
              "type": "string",
              "title": "Agency Timezone",
              "description": "Contains the timezone where the transit agency is located."
            },
            "agency_lang": {
              "type": "string",
              "title": "Agency language",
              "description": "Contains a two-letter ISO 639-1 code for the primary language used by this transit agency. The language code is case-insensitive (both en and EN are accepted). This setting defines capitalization rules and other language-specific settings for all text contained in this transit agency's feed. Please refer to http://www.loc.gov/standards/iso639-2/php/code_list.php for a list of valid values."
            },
            "agency_phone": {
              "type": "string",
              "title": "Agency Phone",
              "description": "Contains a single voice telephone number for the specified agency. This field is a string value that presents the telephone number as typical for the agency's service area. It can and should contain punctuation marks to group the digits of the number. Disable text (for example, TriMet's 503-238-RIDE) is permitted, but the field must not contain any other descriptive text."
            },
            "agency_fare_url": {
              "type": "string",
              "title": "Agency Fare URL",
              "description": "The agency_fare_url specifies the URL of a web page that allows a rider to purchase tickets or other fare instruments for that agency online. The value must be a fully qualified URL that includes http:// or https://, and any special characters in the URL must be correctly escaped. See http://www.w3.org/Addressing/URL/4_URI_Recommentations.html for a description of how to create fully qualified URL values.",
              "format": "uri"
            },
            "agency_email": {
              "type": "string",
              "title": "Agency Email",
              "description": "Contains a single valid email address actively monitored by the agency’s customer service department. This email address will be considered a direct contact point where transit riders can reach a customer service representative at the agency.",
              "format": "email"
            }
          },
          "additionalProperties": true
        }
      ]
    }
  }
  // TODO Attributions Schema
  // TODO Calendar Schema
  // TODO Calendar Dates Schema
  // TODO Fare Attributes Schema
  // TODO Fare Info Schema
  // TODO Fare Rules Schema
  // TODO Feed Info Schema
  // TODO Frequencies Schema
  // TODO Levels Schema
  // TODO Pathways Schema
  // TODO Routes Schema
  // TODO Shapes Schema
  // Stop Times Schema
  stopTimesSchema = {
    "type": "array",
    "title": "The stop_times.txt Schema",
    "uniqueItems": true,
    "description": "A schema to validate stop_times.txt files converted to json object arrays",
    "items": {
      "allOf": [
        {
          "type": "object",
          "required": [
              "trip_id",
              "stop_id",
              "stop_sequence"
          ],
          "properties": {
            "trip_id": {
              "type": "string",
              "title": "Trip ID",
              "description": "Identifies a trip.",
            },
            "arrival_time": {
              "type": "string",
              "title": "Arrival Time",
              "description": "Arrival time at a specific stop for a specific trip on a route. If there are not separate times for arrival and departure at a stop, enter the same value for `arrival_time` and `departure_time`. For times occurring after midnight on the service day, enter the time as a value greater than 24:00:00 in HH:MM:SS local time for the day on which the trip schedule begins.<br/><br/>Scheduled stops where the vehicle strictly adheres to the specified arrival and departure times are timepoints. If this stop is not a timepoint, it is recommended to provide an estimated or interpolated time. If this is not available, arrival_time can be left empty. Further, indicate that interpolated times are provided with `timepoint`=`0`. If interpolated times are indicated with `timepoint`=`0`, then time points must be indicated with `timepoint`=`1`. Provide arrival times for all stops that are time points. An arrival time must be specified for the first and the last stop in a trip."
            },
            "departure_time": {
              "type": "string",
              "title": "Departure Time",
              "description": "Departure time from a specific stop for a specific trip on a route. For times occurring after midnight on the service day, enter the time as a value greater than 24:00:00 in HH:MM:SS local time for the day on which the trip schedule begins. If there are not separate times for arrival and departure at a stop, enter the same value for `arrival_time` and `departure_time`. See the `arrival_time` description for more details about using timepoints correctly. <br><br> The `departure_time` field should specify time values whenever possible, including non-binding estimated or interpolated times between timepoints."
            },
            "agency_lang": {
              "type": "string",
              "title": "Agency language",
              "description": "Contains a two-letter ISO 639-1 code for the primary language used by this transit agency. The language code is case-insensitive (both en and EN are accepted). This setting defines capitalization rules and other language-specific settings for all text contained in this transit agency's feed. Please refer to http://www.loc.gov/standards/iso639-2/php/code_list.php for a list of valid values."
            },
            "stop_id": {
              "type": "string",
              "title": "Stop ID",
              "description": "Identifies the serviced stop. All stops serviced during a trip must have a record in [stop_times.txt](#stop_timestxt). Referenced locations must be stops, not stations or station entrances. A stop may be serviced multiple times in the same trip, and multiple trips and routes may service the same stop."
            },
            "stop_sequence": {
              "type": "number",
              "title": "Stop Sequence",
              "description": "Order of stops for a particular trip. The values must increase along the trip but do not need to be consecutive.<hr>*Example: The first location on the trip could have a `stop_sequence`=`1`, the second location on the trip could have a `stop_sequence`=`23`, the third location could have a `stop_sequence`=`40`, and so on.*",
            },
            "stop_headsign": {
              "type": "string",
              "title": "Stop Headsign",
              "description": "Text that appears on signage identifying the trip's destination to riders. This field overrides the default `trips.trip_headsign` when the headsign changes between stops. If the headsign is displayed for an entire trip, use `trips.trip_headsign` instead. A `stop_headsign` value specified for one `stop_time` does not apply to subsequent `stop_time`s in the same trip. If you want to override the `trip_headsign` for multiple `stop_time`s in the same trip, the `stop_headsign` value must be repeated in each `stop_time` row."
            },
            "pickup_type": {
              "type": "number",
              "title": "Pickup Type",
              "description": "Indicates pickup method. Valid options are: `0` or empty - Regularly scheduled pickup. `1` - No pickup available. `2` - Must phone agency to arrange pickup. `3` - Must coordinate with driver to arrange pickup.",
            },
            "drop_off_type": {
              "type": "number",
              "title": "Drop-off Type",
              "description": "Indicates drop off method. Valid options are: `0` or empty - Regularly scheduled drop off. `1` - No drop off available. `2` - Must phone agency to arrange drop off. `3` - Must coordinate with driver to arrange drop off.",
            },
            "continuous_pickup": {
              "type": "number",
              "title": "Continuous Pickup",
              "description": "Indicates that the rider can board the transit vehicle at any point along the vehicle’s travel path as described by `shapes.txt`, from this `stop_time` to the next `stop_time` in the trip’s `stop_sequence`. Valid options are: `0` - Continuous stopping pickup. `1` or empty - No continuous stopping pickup. `2` - Must phone agency to arrange continuous stopping pickup. `3` - Must coordinate with driver to arrange continuous stopping pickup. If this field is populated, it overrides any continuous pickup behavior defined in `routes.txt`. If this field is empty, the `stop_time` inherits any continuous pickup behavior defined in `routes.txt`.",
            },
            "continuous_drop_off": {
              "type": "number",
              "title": "Continuous Drop-off",
              "description": "Indicates that the rider can alight from the transit vehicle at any point along the vehicle’s travel path as described by `shapes.txt`, from this `stop_time` to the next `stop_time` in the trip’s `stop_sequence`. Valid options are: `0` - Continuous stopping drop off. `1` or empty - No continuous stopping drop off. `2` - Must phone agency to arrange continuous stopping drop off. `3` - Must coordinate with driver to arrange continuous stopping drop off. If this field is populated, it overrides any continuous drop-off behavior defined in `routes.txt`. If this field is empty, the `stop_time` inherits any continuous drop-off behavior defined in `routes.txt`.",
            },
            "shape_dist_traveled": {
              "type": "number",
              "title": "Shape Distance Traveled",
              "description": "Actual distance traveled along the associated shape, from the first stop to the stop specified in this record. This field specifies how much of the shape to draw between any two stops during a trip. Must be in the same units used in [shapes.txt](#shapestxt). Values used for `shape_dist_traveled` must increase along with `stop_sequence`; they cannot be used to show reverse travel along a route.<hr>*Example: If a bus travels a distance of 5.25 kilometers from the start of the shape to the stop,`shape_dist_traveled`=`5.25`.*",
            },
            "timepoint": {
              "type": "number",
              "title": "Shape Distance Traveled",
              "description": "Indicates if arrival and departure times for a stop are strictly adhered to by the vehicle or if they are instead approximate and/or interpolated times. This field allows a GTFS producer to provide interpolated stop-times, while indicating that the times are approximate. Valid options are:<br><br>`0` - Times are considered approximate.<br>`1` or empty - Times are considered exact.",
            },
          },
          "additionalProperties": true
        }
      ]
    }
  }
  // TODO Stops Schema
  // TODO Transfers Schema
  // TODO Translations Schema
  // TODO Trips Schema
  // Schema Options for UI
  schemaOptions = [
    {id: 0, name: "Agency", schema: this.agencySchema},
    {id: 1, name: "Attribution", schema: null},
    {id: 2, name: "Calendar", schema: null},
    {id: 3, name: "Calendar Dates", schema: null},
    {id: 4, name: "Fare Attributes", schema: null},
    {id: 5, name: "Fare Info", schema: null},
    {id: 6, name: "Fare Rules", schema: null },
    {id: 7, name: "Feed Info", schema: null},
    {id: 8, name: "Frequencies", schema: null},
    {id: 9, name: "Levels", schema: null},
    {id: 10, name: "Pathways", schema: null},
    {id: 11, name: "Routes", schema: null},
    {id: 12, name: "Shapes", schema: null},
    {id: 13, name: "Stop Times", schema: this.stopTimesSchema},
    {id: 14, name: "Stops", schema: null},
    {id: 15, name: "Transfers", schema: null},
    {id: 16, name: "Translations", schema: null},
    {id: 17, name: "Trips", schema: null}
  ]

  // Functions used in UI
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  handleSchemaInput(event: any) {
    this.selectedSchema = event.target.value;
  }
  /*
  runValidation() {
    // Check for null schemas
    if (this.schemaOptions[this.selectedSchema].schema === null){
      console.log('Schema Not Implemented');
      return ''
    }

    // Setup validator
    const ajv = new Ajv({allErrors: true});
    addFormats(ajv)
    const validate = ajv.compile(this.schemaOptions[this.selectedSchema].schema);

    // Convert a .txt or .csv to json
    Papa.parse(this.fileToUpload, {
      // Parameters to set
      download: false,
      header: true,
      skipEmptyLines: 'greedy',
      complete: function(results) {
        const valid = validate(results.data);
        if (!valid) {
          console.log("Some Errors Found: ")
          console.log(validate.errors)
        } else {
          console.log("No Errors Found!")
        }
      }
    });
  }
  */
}

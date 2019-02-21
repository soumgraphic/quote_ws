# quote_ws
Quote nodejs mysql webservice with user authentication (JWT), tag, author and category

## Quote endpoint example

{
    "error": false,
    "error_code": 0,
    "message": "Quote retrouver avec succès ",
    "number_of_results": 1,
    "results": {
        "quote": {
            "q_id": 19,
            "q_text": "Il ny'a rien de plus belle que la vie",
            "q_create_date": "2018-11-25T23:09:32.000Z",
            "q_last_update": "2018-11-25T23:09:32.000Z",
            "q_author_a_id": 23,
            "q_category_c_id": 2,
            "u_user_u_id": 23,
            "author": {
                "a_id": 23,
                "a_name": "Soumaila DIARRA",
                "a_create_date": "2018-11-25T15:02:35.000Z",
                "a_last_update": "2018-11-25T15:02:35.000Z"
            },
            "category": {
                "c_id": 2,
                "c_name": "Musique",
                "c_create_date": "2018-11-04T06:30:59.000Z",
                "c_last_update": "2018-11-04T06:30:59.000Z"
            },
            "tagWithQuote": [
                {
                    "q_quote_q_id": 19,
                    "q_tag_t_id": 6,
                    "t_id": 6,
                    "t_name": "Tonight",
                    "t_create_date": "2018-11-18T22:46:19.000Z",
                    "t_last_update": "2018-11-18T22:46:19.000Z"
                }
            ]
        }
    }
}

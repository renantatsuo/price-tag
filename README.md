# Price Tag

Price tag is a service to track stuck I want to buy in MercadoLivre.

## Modules

### Scheduler

Schedules the scrapers publishing a message into the queue.

### Scraper

Listen the queue and make the searches in the site persisting the results in the database.

### Tagger

Tagger is the library who has shared features.

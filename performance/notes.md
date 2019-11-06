1. show upper test together to demonstrate async-iterators are equal or slightly faster
2. show upper test separately to confirm absolute performance in isolation
3. show csv-to-json separately first to show absolute performance
4. show csv-to-json together to demonstrate issue of microtask queue starving Node.js idle queue

CREATE TABLE l2_message (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unique_id INTEGER NOT NULL,
    batch_number INTEGER NOT NULL,
    batch_index INTEGER NOT NULL,
    arb_block_number UNSIGNED BIG INT NOT NULL,
    eth_block_number UNSIGNED BIG INT NOT NULL,
    timestamp DATETIME NOT NULL,
    call_value TEXT NOT NULL DEFAULT 0,
    data TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

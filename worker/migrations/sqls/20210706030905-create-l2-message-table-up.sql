CREATE TABLE l2_message (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unique_id INTEGER NOT NULL,
    batch_number INTEGER NOT NULL,
    batch_index INTEGER NOT NULL,
    arb_block_number INTEGER INT NOT NULL,
    eth_block_number INTEGER NOT NULL,
    timestamp DATETIME NOT NULL,
    call_value TEXT NOT NULL DEFAULT '0',
    data TEXT NOT NULL DEFAULT '',
    status VARCHAR(36) NOT NULL, -- SENT, EXECUTABLE, DONE
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

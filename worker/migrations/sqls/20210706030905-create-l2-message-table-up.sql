CREATE TABLE l2_message (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unique_id TEXT NOT NULL,
    batch_number TEXT NOT NULL,
    batch_index TEXT NOT NULL,
    arb_block_number TEXT INT NOT NULL,
    eth_block_number TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    call_value TEXT NOT NULL DEFAULT '0',
    data TEXT NOT NULL DEFAULT '0x',
    status VARCHAR(36) NOT NULL, -- SENT, EXECUTABLE, DONE
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

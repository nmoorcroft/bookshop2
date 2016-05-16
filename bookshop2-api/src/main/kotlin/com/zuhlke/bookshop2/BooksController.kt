package com.zuhlke.bookshop2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class Book(val id: Long, val title: String)

@RestController
class BooksController @Autowired constructor(val jdbcTemplate: JdbcTemplate) {

    @RequestMapping("/books")
    fun books(): List<Book> = jdbcTemplate.query(
        "select book_id, title from book",
        { rs, rowNum -> Book(rs.getLong("book_id"), rs.getString("title")) }
    )

}


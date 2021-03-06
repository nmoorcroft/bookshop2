package com.zuhlke.bookshop2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.jdbc.core.*
import org.springframework.validation.BindingResult
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.validation.constraints.NotNull

data class Book(val id: Long, val title: String)
data class NewBook(@NotNull val title: String)

@RestController
class BooksController @Autowired constructor(val jdbcTemplate: JdbcTemplate) {

    val bookMapper: RowMapper<Book> = RowMapper { rs, row -> Book(rs.getLong(1), rs.getString(2)) }

    @RequestMapping("/books")
    fun books(): List<Book> = jdbcTemplate.query("select book_id, title from book", bookMapper)

    @RequestMapping("/books/{id}")
    fun book(@PathVariable id: Int): ResponseEntity<Book> {
        val results = jdbcTemplate.query("select book_id, title from book where book_id = ?", arrayOf(id), bookMapper)
        return if (results.size == 1) ResponseEntity(results[0], HttpStatus.OK) else ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @RequestMapping("/new-book")
    fun newBook(@RequestBody @Validated newBook: NewBook, bindingResult: BindingResult): ResponseEntity<String> {
        if (bindingResult.hasErrors()) return ResponseEntity(HttpStatus.BAD_REQUEST)
        jdbcTemplate.update("insert into book (book_id, title) values (null, ?)", newBook.title)
        return ResponseEntity(HttpStatus.CREATED)
    }


}


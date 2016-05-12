package com.zuhlke.bookshop2

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.atomic.AtomicLong

data class Book(val id: Long, val content: String)

@RestController
class BooksController {
    val counter = AtomicLong()

    @RequestMapping("/books")
    fun books(): List<Book> = listOf(
            Book(counter.incrementAndGet(), "The Three Body Problem"),
            Book(counter.incrementAndGet(), "Ancillary Justice"),
            Book(counter.incrementAndGet(), "The Windup Girl"),
            Book(counter.incrementAndGet(), "The City & The City")
    )

}



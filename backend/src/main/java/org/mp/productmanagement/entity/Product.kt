package org.mp.productmanagement.entity

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table
data class Product(@Id var id: Long,
                   var title: String,
                   var description: String,
                   var imageUrl: String) {
}
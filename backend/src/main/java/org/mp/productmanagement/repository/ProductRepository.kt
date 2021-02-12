package org.mp.productmanagement.repository

import org.mp.productmanagement.entity.Product
import org.springframework.data.repository.kotlin.CoroutineSortingRepository
import org.springframework.stereotype.Repository

@Repository
open interface ProductRepository: CoroutineSortingRepository<Product, Long> {
}
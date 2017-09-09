package br.com.tairoroberto.lovedogs.petshopdetail

import android.os.Bundle
import android.support.design.widget.Snackbar
import android.support.v7.app.AppCompatActivity
import br.com.tairoroberto.lovedogs.R
import br.com.tairoroberto.lovedogs.base.extension.loadImage
import br.com.tairoroberto.lovedogs.petshop.model.PetShop
import kotlinx.android.synthetic.main.activity_petshop_detail.*

class PetshopDetailActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_petshop_detail)
        setSupportActionBar(toolbar)
        fab.setOnClickListener { view ->
            Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                    .setAction("Action", null).show()
        }
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        if( intent.extras != null ) {
            val petShop: PetShop = intent.extras.getParcelable("petShop")
            imageViewPetShop.loadImage(petShop.imageUrl)
        }

    }
}